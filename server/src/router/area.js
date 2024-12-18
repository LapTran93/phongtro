import express from "express";
import * as areaController from "../controller/area";
const router = express.Router();

router.get("/all", areaController.getArea);
export default router;
