import express from "express";
import verifyToken from "../middleware/verifyToken";
import * as userController from "../controller/user";
const router = express.Router();

router.use(verifyToken);
router.get("/get-current", userController.getUser);
router.put("/update-user", userController.updateUser);
router.put("/update-password", userController.updatePassword);

export default router;
