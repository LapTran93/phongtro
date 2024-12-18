import { where } from "sequelize";
import bcrypt from "bcryptjs";
import db from "../models";

export const getCurrentUserServices = (id) =>
  new Promise(async (resovle, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id },
        raw: true,
        attributes: {
          exclude: ["password"],
        },
      });
      resovle({
        err: response ? 0 : 1,
        msg: response
          ? "Đã lấy thông tin user đăng nhập"
          : "Lấy thông tin user thất bại.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const updateUserServices = (userid, body) =>
  new Promise(async (resolve, reject) => {
    try {
      const updateFields = {
        avatar: body.image,
        phone: body.phone,
        email: body.email,
        name: body.name,
      };

      Object.keys(updateFields).forEach(
        (key) => updateFields[key] === undefined && delete updateFields[key]
      );

      const [affectedRows] = await db.User.update(updateFields, {
        where: { id: userid },
      });

      if (affectedRows === 0) {
        resolve({
          err: -1,
          msg: "Không tìm thấy người dùng hoặc không thay đổi dữ liệu.",
        });
      }

      resolve({ err: 0, msg: "Cập nhật thông tin thành công." });
    } catch (error) {
      reject(error);
    }
  });
export const updatePasswordServices = (userid, body) =>
  new Promise(async (resolve, reject) => {
    try {
      const { passwordOld, passwordNew } = body;

      // Lấy thông tin người dùng theo ID
      const user = await db.User.findOne({ where: { id: userid } });

      if (!user) {
        return resolve({
          err: -1,
          msg: "Người dùng không tồn tại.",
        });
      }

      // So sánh mật khẩu cũ đã mã hóa với mật khẩu người dùng nhập vào
      const isMatch = bcrypt.compareSync(passwordOld, user.password); // Sử dụng bcrypt để so sánh mật khẩu

      if (!isMatch) {
        return resolve({
          err: -1,
          msg: "Mật khẩu cũ không đúng.",
        });
      }

      // Mã hóa mật khẩu mới
      const hashedPassword = bcrypt.hashSync(
        passwordNew,
        bcrypt.genSaltSync(12)
      );

      // Cập nhật mật khẩu mới
      await db.User.update(
        { password: hashedPassword },
        { where: { id: userid } }
      );

      resolve({
        err: 0,
        msg: "Đổi mật khẩu thành công.",
      });
    } catch (error) {
      reject(error);
    }
  });
