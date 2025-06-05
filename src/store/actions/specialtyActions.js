import { getSpecialty } from "../../services/specialtyService";
import actionTypes from "./actionTypes";

export const fetchAllSpecialty = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getSpecialty();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
          allSpecialty: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_SPECIALTY_FAILED,
        });
      }
    } catch (error) {
      console.log("FETCH_ALL_SPECIALTY_FAILED: ", error);
      dispatch({
        type: actionTypes.FETCH_ALL_SPECIALTY_FAILED,
      });
    }
  };
};

export const fetchSpecialtyById = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getSpecialty();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_SPECIALTY_BY_ID_SUCCESS,
          specialty: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_SPECIALTY_BY_ID_FAILED,
        });
      }
    } catch (error) {
      console.log("FETCH_SPECIALTY_BY_ID_FAILED: ", error);
      dispatch({
        type: actionTypes.FETCH_SPECIALTY_BY_ID_FAILED,
      });
    }
  };
};