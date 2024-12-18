import * as insertServies from "../services/insert";

export const insert = async (req, res) => {
  try {
    const response = await insertServies.createPricesAndAreas();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: "Lỗi server",
      msg: "Fail at auth controller" + error,
    });
  }
};
