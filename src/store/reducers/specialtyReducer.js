import actionTypes from "../actions/actionTypes";

const initialState = {
  allSpecialty: [],
  specialty: {},
};

const specialtyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
      return {
        ...state,
        allSpecialty: action.allSpecialty
      };
    case actionTypes.FETCH_ALL_SPECIALTY_FAILED:
      return {
        ...state,
      };
    case actionTypes.FETCH_SPECIALTY_BY_ID_SUCCESS:
      return {
        ...state,
        specialty: action.specialty
      };
    case actionTypes.FETCH_SPECIALTY_BY_ID_FAILED:
      return {
        ...state,
        
      };
    default:
      return state;
  }
};

export default specialtyReducer;