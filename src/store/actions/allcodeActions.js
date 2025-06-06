import { getAllCode } from "../../services/allcodeService";
import { getClinic } from "../../services/clinicService";
import { getSpecialty } from "../../services/specialtyService";
import { saveBulkDoctorSchedule } from "../../services/userService";
import actionTypes from "./actionTypes";

// gender
export const fetchGenderStart = () => {
  return async (dispatch, setState) => {
    try {
      let res = await getAllCode("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log(error);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

// postion
export const fetchPositionStart = () => {
  return async (dispatch, setState) => {
    try {
      let res = await getAllCode("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
      console.log(error);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

// role
export const fetchRoleStart = () => {
  return async (dispatch, setState) => {
    try {
      let res = await getAllCode("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log(error);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

// Time
export const fetchScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCode("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TIME_FAILED,
        });
      }
    } catch (error) {
      console.log("FETCH_TIME_FAILED: ", error);
      dispatch({
        type: actionTypes.FETCH_TIME_FAILED,
      });
    }
  };
};

// save bulk schedule
export const saveBulkDoctorScheduleRedux = (data) => {
  return async (dispatch) => {
    try {
      let res = await saveBulkDoctorSchedule(data);
      if (res && res.errCode === 0) {
        dispatch({ type: actionTypes.SAVE_BULK_SCHEDULE_SUCCESS });
      } else {
        dispatch({ type: actionTypes.SAVE_BULK_SCHEDULE_FAILED });
      }
      return res;
    } catch (error) {
      dispatch({ type: actionTypes.SAVE_BULK_SCHEDULE_FAILED });
      return null;
    }
  };
};

export const getRequiredDoctorInfor = () => {
  return async (dispatch, getstate) => {
    try {
      // dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })

      let resPrice = await getAllCode("PRICE");
      let resPayment = await getAllCode("PAYMENT");
      let resProvince = await getAllCode("PROVINCE");
      let resSpecialty = await getSpecialty();
      let resClinic = await getClinic()
      // let resClinic = await getAllCode("CLINIC");

      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };
        dispatch({
          type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
          data: data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
      });
      console.log("FETCH_REQUIRED_DOCTOR_INFOR_FAILED", e);
    }
  };
};
