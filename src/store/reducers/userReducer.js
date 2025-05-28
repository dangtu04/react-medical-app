import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  users: [],
  topDoctor: [],
  allDoctor: [],
  doctorDetail: {},
  doctorMarkdown: {},
  doctorSchedule: [],
  doctorExtraInfor: {},
  profileDoctor: {},
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };

    case actionTypes.FETCH_USER_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_USER_FAILED:
      state.users = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctor = action.doctorData;
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_DOCTOR_FAILED:
      state.topDoctor = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctor = action.doctorData;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DOCTOR_FAILED:
      state.allDoctor = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_DOCTOR_DETAIL_SUCCESS:
      state.doctorDetail = action.doctorDetail;
      return {
        ...state,
      };

    case actionTypes.FETCH_DOCTOR_DETAIL_FAILED:
      state.doctorDetail = {};
      return {
        ...state,
      };

    case actionTypes.FETCH_MARKDOWN_BY_DOCTOR_SUCCESS:
      state.doctorMarkdown = action.doctorMarkdown;
      return {
        ...state,
      };

    case actionTypes.FETCH_MARKDOWN_BY_DOCTOR_FAILED:
      state.doctorMarkdown = {};
      return {
        ...state,
      };
    case actionTypes.FETCH_DOCTOR_SCHEDULE_SUCCESS:
      state.doctorSchedule = action.doctorSchedule;
      return {
        ...state,
      };

    case actionTypes.FETCH_DOCTOR_SCHEDULE_FAILED:
      state.doctorSchedule = {};
      return {
        ...state,
      };

    case actionTypes.FETCH_DOCTOR_INFOR_EXTRA_SUCCESS:
      state.doctorExtraInfor = action.doctorExtraInfor;
      return {
        ...state,
      };

    case actionTypes.FETCH_DOCTOR_INFOR_EXTRA_FAILED:
      state.doctorExtraInfor = {};
      return {
        ...state,
      };

    case actionTypes.FETCH_PROFILE_DOCTOR_SUCCESS:
      state.profileDoctor = action.profileDoctor;
      return {
        ...state,
      };
    case actionTypes.FETCH_PROFILE_DOCTOR_FAILED:
      state.profileDoctor = {};
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default appReducer;
