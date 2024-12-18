import actionType from "../actions/actionType";
const initState = {
  msg: "",
  category: [],
  price: [],
  area: [],
  province: [],
  districts: [],
  ward: [],
};
const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_CATEGORY:
      return {
        ...state,
        category: action.category || [],
        msg: action.msg || "",
      };
    case actionType.GET_PRICE:
      return {
        ...state,
        price: action.price || [],
        msg: action.msg || "",
      };
    case actionType.GET_AREA:
      return {
        ...state,
        area: action.area || [],
        msg: action.msg || "",
      };
    case actionType.GET_PROVINCE:
      return {
        ...state,
        province: action.province || [], // Gán dữ liệu tỉnh thành
        msg: action.msg || "", // Gán thông báo trạng thái
      };
    case actionType.GET_DISTRICTS:
      return {
        ...state,
        districts: action.districts || [], // Gán dữ liệu tỉnh thành
        msg: action.msg || "", // Gán thông báo trạng thái
      };
    case actionType.GET_WARD:
      return {
        ...state,
        ward: action.ward || [], // Gán dữ liệu tỉnh thành
        msg: action.msg || "", // Gán thông báo trạng thái
      };
    default:
      return state;
  }
};

export default appReducer;
