import actionType from "../actions/actionType";
const initState = {
  posts: [],
  msg: "",
  count: 0,
  newpost: [],
};
const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_POST:
    case actionType.GET_POST_LIMIT:
      return {
        ...state,
        posts: action.posts || [],
        msg: action.msg || "",
        count: action.count || 0,
      };
    case actionType.GET_NEW_POST:
      return {
        ...state,
        newpost: action.newpost || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

export default postReducer;
