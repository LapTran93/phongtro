import * as authService from "../services/auth";

export const register = async (req, res) => {
  const { name, phone, password, email } = req.body;
  try {
    if (!name || !phone || !password || !email)
      return res.status(400).json({
        err: "Lỗi client",
        msg: "Nhập thiếu thông tin !",
      });
    const response = await authService.registerServies(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: "Lỗi server",
      msg: "Fail at auth controller" + error,
    });
  }
};
export const login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    if (!phone || !password)
      return res.status(400).json({
        err: "Lỗi client",
        msg: "Nhập thiếu thông tin !",
      });
    const response = await authService.loginServies(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: "Lỗi server",
      msg: "Fail at auth controller" + error,
    });
  }
};
