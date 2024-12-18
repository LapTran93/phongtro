import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "express";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
require("dotenv").config();

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));
//hàm xử lý khi tạo tài khoản
export const registerServies = ({ phone, name, password, email }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { phone },
        defaults: {
          // corrected from "default" to "defaults"
          phone,
          name,
          email,
          password: hashPassword(password),
          id: v4(),
        },
      });

      const token =
        response[1] &&
        jwt.sign(
          { id: response[0].id, phone: response[0].phone },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );

      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Tạo tài khoản thành công"
          : "Số điện thoại đã được sử dụng",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });

//hàm xử lý khi login
export const loginServies = ({ phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { phone },
        raw: true,
      });
      const isCorrectPassword =
        response && bcrypt.compareSync(password, response.password);
      const token =
        isCorrectPassword &&
        jwt.sign(
          { id: response.id, phone: response.phone },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );

      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Đăng nhập thành công"
          : response
          ? "Mật khẩu không chính xác"
          : "Số điện thoại không tìm thấy",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });
