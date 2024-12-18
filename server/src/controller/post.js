import * as postService from "../services/post";

export const getPost = async (req, res) => {
  try {
    const response = await postService.getPostServices();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Faild at post controller" + error,
    });
  }
};
export const getPostLimit = async (req, res) => {
  const { page, ...query } = req.query; // nhận page thay vì offset
  try {
    const response = await postService.getPostLimitServices(page, query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const getNewPost = async (req, res) => {
  try {
    const response = await postService.getNewPostServices();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const CreateNewPost = async (req, res) => {
  try {
    const {
      priceCode,
      areaCode,
      provincecode,
      address,
      categorycode,
      title,
      description,
      image,
      label,
      price,
      area,
    } = req.body;
    const { id } = req.user;

    // Kiểm tra nếu thiếu bất kỳ trường nào
    if (
      !categorycode ||
      !id ||
      !title ||
      !priceCode ||
      !address ||
      !areaCode ||
      !description ||
      !image ||
      !provincecode ||
      !label ||
      !price ||
      !area
    )
      return res.status(400).json({
        err: -1,
        msg: "Nhập thiếu trường bắt buộc.",
      });

    const response = await postService.CreateNewPostServices(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error.message,
    });
  }
};
export const getPostById = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(400).json({
        err: 1,
        msg: "Thiếu iduser trong yêu cầu",
      });
    }
    const response = await postService.getPostByIdServices(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Faild at post controller" + error,
    });
  }
};
