import actionTypes from "../actions/actionTypes";

const initialState = {
  allClinic: [],
};

const clinicReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
      return {
        ...state,
        allClinic: action.allClinic,
      };
    case actionTypes.FETCH_ALL_CLINIC_FAILED:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default clinicReducer;
