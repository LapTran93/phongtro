import * as Services from "../services/user";

export const getUser = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await Services.getCurrentUserServices(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Faild at price controller" + error,
    });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.user; // Lấy ID từ middleware xác thực
    const { image, phone, name, email } = req.body;

    // Kiểm tra ít nhất một trường cần cập nhật
    if (!phone && !name && !email && !image) {
      return res.status(400).json({
        err: -1,
        msg: "Yêu cầu cập nhật phải có ít nhất một trường.",
      });
    }

    const response = await Services.updateUserServices(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Lỗi Backend:", error);
    return res.status(500).json({
      err: 1,
      msg: "Đã xảy ra lỗi khi cập nhật thông tin.",
    });
  }
};
export const updatePassword = async (req, res) => {
  try {
    const { id } = req.user; // Lấy ID người dùng từ token
    const { passwordOld, passwordNew } = req.body;

    if (!passwordOld || !passwordNew) {
      return res.status(400).json({
        err: -1,
        msg: "Yêu cầu cung cấp đầy đủ mật khẩu cũ và mật khẩu mới.",
      });
    }

    // Gọi service để xử lý
    const response = await Services.updatePasswordServices(id, req.body);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Đã xảy ra lỗi khi đổi mật khẩu.",
    });
  }
};
