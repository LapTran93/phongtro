import actionType from "./actionType";
import { apigetCurrent } from "../../services/user";

export const getCurrent = () => async (dispatch) => {
  try {
    const response = await apigetCurrent();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_CURRENT,
        currentData: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_CURRENT,
        msg: response.data.msg,
        currentData: null,
      });
      dispatch({
        type: actionType.LOGOUT,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_CURRENT,
      msg: error,
      currentData: null,
    });
    dispatch({
      type: actionType.LOGOUT,
    });
  }
};
