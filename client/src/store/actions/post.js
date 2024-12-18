import actionType from "./actionType";
import {
  apigetPost,
  apigetPostLimit,
  apigetNewPost,
} from "../../services/post";

export const getPosts = () => async (dispatch) => {
  try {
    const response = await apigetPost();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_POST,
        posts: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_POST,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_POST,
      posts: null,
    });
  }
};

export const getPostsLimit = (query) => async (dispatch) => {
  try {
    const response = await apigetPostLimit(query);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_POST_LIMIT,
        posts: response.data.response?.rows,
        count: response.data.response?.count,
      });
    } else {
      dispatch({
        type: actionType.GET_POST_LIMIT,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_POST_LIMIT,
      posts: null,
    });
  }
};
export const getNewPost = () => async (dispatch) => {
  try {
    const response = await apigetNewPost();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_NEW_POST,
        newpost: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_NEW_POST,
        msg: response.data.msg,
        newpost: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_NEW_POST,
      newpost: null,
    });
  }
};
