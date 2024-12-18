import * as areaServices from "../services/area";

export const getArea = async (req, res) => {
  try {
    const response = await areaServices.getAreasServices();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Faild at price controller" + error,
    });
  }
};
