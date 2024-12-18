import db from "../models";

export const getAreasServices = () =>
  new Promise(async (resovle, reject) => {
    try {
      const response = await db.Area.findAll({
        raw: true,
        attributes: ["code", "value"],
      });
      resovle({
        err: response ? 0 : 1,
        msg: response ? "Đã lấy Area" : "Lấy Area thất bại.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
