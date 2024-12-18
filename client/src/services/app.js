import axiosConfig from "../axiosConfig";
import axiosAPI from "../axiosAPI";
export const apigetPrice = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/price/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetArea = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/area/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apigetProvince = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosAPI.get("/p/");
      if (response?.status === 200 && response?.data) {
        resolve(response.data); // Chỉ trả về dữ liệu cần thiết
      } else {
        reject(new Error("Không thể lấy danh sách tỉnh thành."));
      }
    } catch (error) {
      reject(error); // Trả về lỗi để xử lý ở nơi gọi hàm
    }
  });
};

export const apigetDistricts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosAPI.get("/d/");
      if (response?.status === 200 && response?.data) {
        resolve(response.data); // Chỉ trả về dữ liệu cần thiết
      } else {
        reject(new Error("Không thể lấy danh sách quận huyện."));
      }
    } catch (error) {
      reject(error); // Trả về lỗi để xử lý ở nơi gọi hàm
    }
  });
};
export const apigetWards = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosAPI.get("/w/");
      if (response?.status === 200 && response?.data) {
        resolve(response.data); // Chỉ trả về dữ liệu cần thiết
      } else {
        reject(new Error("Không thể lấy danh sách phường xã."));
      }
    } catch (error) {
      reject(error); // Trả về lỗi để xử lý ở nơi gọi hàm
    }
  });
};
