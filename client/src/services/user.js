import axiosConfig from "../axiosConfig";
export const apigetCurrent = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/user/get-current",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUpdateUser = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: "/api/v1/user/update-user",
        data: payload,
      });
      resolve(response.data); // Đảm bảo trả về dữ liệu `response.data`
    } catch (error) {
      reject(error);
    }
  });

export const apiPassword = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: "/api/v1/user/update-password",
        data: payload,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
