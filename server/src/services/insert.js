import db from "../models/index";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import chothuematbang from "../../data/chothuematbang.json";
import chothuecanho from "../../data/chothuecanho.json";
import nhachothue from "../../data/nhachothue.json";
import chothuephongtro from "../../data/chothuephongtro.json";
import gererate from "../../ultis/gererate";
import { dataPrice, dataArea } from "../../ultis/data";
import { getNumberFromString } from "../../ultis/common";
import { where } from "sequelize";
require("dotenv").config();

const dataBody = chothuephongtro.body;

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));
//hàm xử lý khi tạo tài khoản
export const insertServies = () =>
  new Promise(async (resolve, reject) => {
    try {
      dataBody.forEach(async (item) => {
        // Generate unique IDs for each record inside the loop
        let postId = v4();
        let attributeId = v4();
        let userId = v4();
        let overviewId = v4();
        let imageId = v4();
        let labelCode = gererate(item?.header?.class?.classType);
        let currentArea = getNumberFromString(
          item?.header?.attributes?.acreage
        );
        let currentPrice = getNumberFromString(item?.header?.attributes?.price);
        await db.Post.create({
          id: postId,
          title: item?.header?.title,
          star: item?.header?.star,
          labelcode: labelCode,
          address: item?.header?.address,
          attributeid: attributeId,
          categorycode: "CTPT",
          description: JSON.stringify(item?.mainContent?.content),
          userid: userId,
          overviewid: overviewId,
          imageid: imageId,
          provincecode: 2,
          areacode: dataArea.find(
            (area) => area.max > currentArea && area.min <= currentArea
          )?.code,
          pricecode: dataPrice.find(
            (price) => price.max > currentPrice && price.min <= currentPrice
          )?.code,
        });

        await db.Attribute.create({
          id: attributeId,
          price: item?.header?.attributes?.price,
          acreage: item?.header?.attributes?.acreage,
          published: item?.header?.attributes?.published,
          hashtag: item?.header?.attributes?.hashtag,
        });

        await db.Image.create({
          id: imageId,
          image: JSON.stringify(item?.images),
        });

        await db.Label.findOrCreate({
          where: { code: labelCode },
          defaults: {
            code: labelCode,
            value: item?.header?.class?.classType,
          },
        });

        await db.Overview.create({
          id: overviewId,
          code: item?.overview?.content.find((i) => i.name === "Mã tin:")
            ?.content,
          area: item?.overview?.content.find((i) => i.name === "Khu vực")
            ?.content,
          type: item?.overview?.content.find((i) => i.name === "Loại tin rao:")
            ?.content,
          target: item?.overview?.content.find(
            (i) => i.name === "Đối tượng thuê:"
          )?.content,
          bonus: item?.overview?.content.find((i) => i.name === "Gói tin:")
            ?.content,
          created: item?.overview?.content.find((i) => i.name === "Ngày đăng:")
            ?.content,
          expire: item?.overview?.content.find(
            (i) => i.name === "Ngày hết hạn:"
          )?.content,
        });

        await db.User.create({
          id: userId,
          name: item?.contact?.content.find((i) => i.name === "Liên hệ:")
            ?.content,
          password: hashPassword("123456"),
          phone: item?.contact?.content.find((i) => i.name === "Điện thoại:")
            ?.content,
          email: "test@gmail.com",
          zalo: item?.contact?.content.find((i) => i.name === "Zalo")?.content,
        });
      });

      resolve("Done");
    } catch (error) {
      reject(error);
    }
  });
export const createPricesAndAreas = () =>
  new Promise((resolve, reject) => {
    try {
      dataPrice.forEach(async (item, index) => {
        await db.Price.create({
          code: item.code,
          value: item.value,
          order: index + 1,
        });
      });
      dataArea.forEach(async (item, index) => {
        await db.Area.create({
          code: item.code,
          value: item.value,
          order: index + 1,
        });
      });
      resolve("OK");
    } catch (err) {
      reject(err);
    }
  });
