import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  positions: [],
  roles: [],
  times: [],
  allRequiredDoctorInfor: [],
};

const allcodeReducer = (state = initialState, action) => {
  switch (action.type) {
    // gender
    case actionTypes.FETCH_GENDER_START:
      return {
        ...state,
      };

    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      return {
        ...state,
      };

    case actionTypes.FETCH_GENDER_FAILED:
      state.genders = []
      return {
        ...state,
      };
    // position
    case actionTypes.FETCH_POSITION_START:
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_FAILED:
      state.positions = []
      return {
        ...state,
      };

    // role
    case actionTypes.FETCH_ROLE_START:
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = []
      return {
        ...state,
      };

    // Time
     case actionTypes.FETCH_TIME_SUCCESS:
      state.times = action.dataTime;
      return {
        ...state,
      };

    case actionTypes.FETCH_TIME_FAILED:
      state.times = []
      return {
        ...state,
      };

       // allRequiredDoctorInfor
     case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
      state.allRequiredDoctorInfor = action.data;
      return {
        ...state,
      };

    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
      state.allRequiredDoctorInfor = []
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default allcodeReducer;
