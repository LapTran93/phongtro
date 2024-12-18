import actionType from "./actionType";
import { apigetCategory } from "../../services/category";
import { apigetPrice } from "../../services/app";
import {
  apigetArea,
  apigetProvince,
  apigetDistricts,
  apigetWards,
} from "../../services/app";
export const getCategorys = () => async (dispatch) => {
  try {
    const response = await apigetCategory();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_CATEGORY,
        category: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_CATEGORY,
        msg: response.data.msg,
        category: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_CATEGORY,
      category: null,
    });
  }
};

export const getPrices = () => async (dispatch) => {
  try {
    const response = await apigetPrice();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_PRICE,
        price: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_PRICE,
        msg: response.data.msg,
        price: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_PRICE,
      price: null,
    });
  }
};
export const getAreas = () => async (dispatch) => {
  try {
    const response = await apigetArea();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_AREA,
        area: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_AREA,
        msg: response.data.msg,
        area: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_AREA,
      area: null,
    });
  }
};
export const getProvince = () => async (dispatch) => {
  try {
    const provinces = await apigetProvince(); // Hàm apigetProvince đã trả về `response.data`

    if (provinces && Array.isArray(provinces)) {
      dispatch({
        type: actionType.GET_PROVINCE,
        province: provinces, // Đặt thẳng danh sách tỉnh thành vào `province`
        msg: "Lấy danh sách tỉnh thành thành công!",
      });
    } else {
      dispatch({
        type: actionType.GET_PROVINCE,
        province: [],
        msg: "Không tìm thấy dữ liệu tỉnh thành.",
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_PROVINCE,
      province: [],
      msg: `Lỗi khi lấy danh sách tỉnh thành: ${error.message}`,
    });
  }
};
export const getDistricts = () => async (dispatch) => {
  try {
    const district = await apigetDistricts();

    if (district && Array.isArray(district)) {
      dispatch({
        type: actionType.GET_DISTRICTS,
        districts: district,
        msg: "Lấy danh sách tỉnh thành thành công!",
      });
    } else {
      dispatch({
        type: actionType.GET_DISTRICTS,
        districts: [],
        msg: "Không tìm thấy dữ liệu tỉnh thành.",
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_DISTRICTS,
      districts: [],
      msg: `Lỗi khi lấy danh sách tỉnh thành: ${error.message}`,
    });
  }
};
export const getWards = () => async (dispatch) => {
  try {
    const wards = await apigetWards();

    if (wards && Array.isArray(wards)) {
      dispatch({
        type: actionType.GET_WARD,
        ward: wards,
        msg: "Lấy danh sách tỉnh thành thành công!",
      });
    } else {
      dispatch({
        type: actionType.GET_WARD,
        ward: [],
        msg: "Không tìm thấy dữ liệu tỉnh thành.",
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_WARD,
      ward: [],
      msg: `Lỗi khi lấy danh sách tỉnh thành: ${error.message}`,
    });
  }
};
