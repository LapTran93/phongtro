import { raw } from "express";
import db from "../models";
import { where } from "sequelize";
import { v4 as generateId } from "uuid";
import gererate from "../../ultis/gererate";
import moment from "moment";
require("dotenv").config();

export const getPostServices = () =>
  new Promise(async (reslove, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "users",
            attributes: ["name", "zalo", "phone", "avatar"],
          },
        ],
        attributes: ["id", "title", "star", "description", "address"],
      });
      reslove({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Lấy bài post thất bại",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getPostLimitServices = (page, query) =>
  new Promise(async (reslove, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      const response = await db.Post.findAndCountAll({
        where: query,
        raw: true,
        nest: true,
        offset: offset * +process.env.LIMIT,
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "users",
            attributes: ["name", "zalo", "phone", "avatar", "createdAt"],
          },
        ],
        attributes: [
          "id",
          "title",
          "star",
          "description",
          "address",
          "createdAt",
          "categorycode",
          "provincecode",
        ],
      });
      reslove({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Lấy bài post thất bại",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const getNewPostServices = () =>
  new Promise(async (reslove, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        offset: 0,
        order: [["createdAt", "DESC"]],
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "users",
            attributes: ["name", "zalo", "phone", "avatar"],
          },
        ],
        attributes: [
          "id",
          "title",
          "star",
          "description",
          "address",
          "createdAt",
        ],
      });
      reslove({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Lấy bài post thất bại",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const CreateNewPostServices = (body, userid) =>
  new Promise(async (reslove, reject) => {
    try {
      const attributeid = generateId();
      const imageid = generateId();
      const overviewid = generateId();
      const labelcode = gererate(body.label);
      const hashtag = Math.floor(Math.random() * Math.pow(10, 6));
      const currentDate = new Date();
      await db.Post.create({
        id: generateId(),
        star: "0",
        title: body.title || null,
        labelcode: labelcode,
        address: `Địa chỉ: ${body.address}` || null,
        attributeid: attributeid,
        categorycode: body.categorycode || null,
        description: JSON.stringify(body.description) || null,
        userid: userid,
        overviewid: overviewid,
        imageid: imageid,
        provincecode: body.provincecode || null,
        areacode: body.areaCode || null,
        pricecode: body.priceCode || null,
      });
      await db.Attribute.create({
        id: attributeid,
        price:
          body.price >= 1000000
            ? `${(body.price / 1000000).toFixed(1)} triệu/tháng`
            : `${parseInt(body.price).toLocaleString("vi-VN")} đồng/tháng` ||
              null,
        acreage: `${body.area}m²` || null,
        published: moment(new Date()).format("DD/MM/YY"),
        hashtag: hashtag,
      });
      await db.Image.create({
        id: imageid,
        image: JSON.stringify(body.image),
      });
      await db.Overview.create({
        id: overviewid,
        code: hashtag,
        area: body.label,
        type: body.category || "Phòng trọ nhà trọ",
        target: "Tất cả" || "Tất cả",
        bonus: "Tin thường",
        created: currentDate,
        expire: currentDate.setDate(currentDate.getDate(), 10),
      });
      await db.Label.findOrCreate({
        where: {
          code: labelcode,
        },
        defaults: {
          code: labelcode,
          value: body.label,
        },
      });
      reslove({
        err: 0,
        msg: "OK",
      });
    } catch (error) {
      reject(error);
    }
  });
export const getPostByIdServices = (iduser) =>
  new Promise(async (reslove, reject) => {
    try {
      const response = await db.Post.findAll({
        where: { userid: iduser },
        raw: true,
        nest: true,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "users",
            attributes: ["name", "zalo", "phone", "avatar"],
          },
        ],
        attributes: ["id", "title", "star", "description", "address"],
      });
      reslove({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Lấy bài post thất bại",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
