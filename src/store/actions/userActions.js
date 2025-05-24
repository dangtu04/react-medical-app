import {
  createDoctorDetail,
  createNewUser,
  deleteUser,
  editUser,
  getAllDoctors,
  getAllUsers,
  getDoctorDetail,
  getMarkdownByDoctorId,
  getTopDoctor,
} from "../../services/userService";
import actionTypes from "./actionTypes";

export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo: userInfo,
});

export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

////////////////// Create User
export const addNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUser(data);
      if (res && res.errCode === 0) {
        dispatch(addUserSuccess());
      } else {
        dispatch(addUserFailed());
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  };
};

export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

export const addUserFailed = () => ({
  type: actionTypes.ADD_USER_FAILED,
});

////////////////// Get User
export const fetchAllUser = () => {
  return async (dispatch, setState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUserFailed());
      }
    } catch (error) {
      dispatch(fetchAllUserFailed());
      console.log(error);
    }
  };
};

export const fetchAllUserSuccess = (userData) => ({
  type: actionTypes.FETCH_USER_SUCCESS,
  users: userData,
});

export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_USER_FAILED,
});

////////////////// Delete User
export const deleteAUser = (id) => {
  return async (dispatch, setState) => {
    try {
      let res = await deleteUser(id);
      if (res && res.errCode === 0) {
        dispatch(deleteUserSuccess());
      } else {
        dispatch(deleteUserFailed());
      }
      return res;
    } catch (error) {
      dispatch(deleteUserFailed());
      console.log(error);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

////////////////// Edit User
export const editAUser = (editData) => {
  return async (dispatch, setState) => {
    try {
      let res = await editUser(editData);
      if (res && res.errCode === 0) {
        dispatch(editUserSuccess());
      } else {
        dispatch(editUserFailed());
      }
      return res;
    } catch (error) {
      dispatch(editUserFailed());
      console.log(error);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
});
export const editUserFailed = () => ({
  type: actionTypes.UPDATE_USER_FAILED,
});

////////////////// Get Top Doctor
export const fetchTopDoctor = () => {
  return async (dispatch, setState) => {
    try {
      let res = await getTopDoctor("10");
      if (res && res.errCode === 0) {
        dispatch(fetchTopDoctorSuccess(res.data));
      } else {
        dispatch(fetchTopDoctorFailed());
      }
    } catch (error) {
      dispatch(fetchTopDoctorFailed());
      console.log("FETCH_TOP_DOCTOR_FAILED: ", error);
    }
  };
};

export const fetchTopDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
  doctorData: data,
});
export const fetchTopDoctorFailed = () => ({
  type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
});

////////////////// Get All Doctor
export const fetchAllDoctor = () => {
  return async (dispatch, setState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch(fetchAllDoctorSuccess(res.data));
      } else {
        dispatch(fetchAllDoctorFailed());
      }
    } catch (error) {
      dispatch(fetchAllDoctorFailed());
      console.log("FETCH_ALL_DOCTOR_FAILED: ", error);
    }
  };
};

export const fetchAllDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
  doctorData: data,
});
export const fetchAllDoctorFailed = () => ({
  type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
});

////////////////// Save doctor detail

export const saveDoctorDetail = (data) => {
  return async (dispatch, setState) => {
    try {
      let res = await createDoctorDetail(data);
      if (res && res.errCode === 0) {
        dispatch(saveDoctorDetailSuccess());
      } else {
        dispatch(saveDoctorDetailFailed());
      }
      return res;
    } catch (error) {
      dispatch(saveDoctorDetailFailed());
      console.log("SAVE_DOCTOR_DETAIL_FAILED: ", error);
    }
  };
};

export const saveDoctorDetailSuccess = () => ({
  type: actionTypes.SAVE_DOCTOR_DETAIL_SUCCESS,
});
export const saveDoctorDetailFailed = () => ({
  type: actionTypes.SAVE_DOCTOR_DETAIL_FAILED,
});

/////////////// Get doctor detail

export const fetchDoctorDetail = (id) => {
  return async (dispatch, setState) => {
    try {
      let res = await getDoctorDetail(id);
      if (res && res.errCode === 0) {
        dispatch(fetchDoctorDetailSuccess(res.data));
      } else {
        dispatch(fetchDoctorDetailFailed());
      }
    } catch (error) {
      dispatch(fetchDoctorDetailFailed());
      console.log("FETCH_DOCTOR_DETAIL_FAILED: ", error);
    }
  };
};

export const fetchDoctorDetailSuccess = (data) => ({
  type: actionTypes.FETCH_DOCTOR_DETAIL_SUCCESS,
  doctorDetail: data,
});
export const fetchDoctorDetailFailed = () => ({
  type: actionTypes.FETCH_DOCTOR_DETAIL_FAILED,
});

// fetch markdown by doctorId
export const fetchMarkdownByDoctorId = (doctorId) => {
  return async (dispatch, getState) => {
    try {
      let res = await getMarkdownByDoctorId(doctorId);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_MARKDOWN_BY_DOCTOR_SUCCESS,
          doctorMarkdown: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_MARKDOWN_BY_DOCTOR_FAILED,
        });
      }
    } catch (error) {
      console.log("FETCH_MARKDOWN_BY_DOCTOR_FAILED: ", error);
      dispatch({
        type: actionTypes.FETCH_MARKDOWN_BY_DOCTOR_FAILED,
      });
    }
  };
};
