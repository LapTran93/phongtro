import actionType from "../actions/actionType";

const initState = {
  currentData: {},
};
const userReducer = (state = initState, acction) => {
  switch (acction.type) {
    case actionType.GET_CURRENT:
      return {
        ...state,
        currentData: acction.currentData || {},
      };
    case actionType.LOGOUT:
      return {
        ...state,
        currentData: {},
      };
    default:
      return state;
  }
};
export default userReducer;
