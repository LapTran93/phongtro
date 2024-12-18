import express from "express";
import * as postController from "../controller/post";
import verifyToken from "../middleware/verifyToken";
const router = express.Router();

router.get("/all", postController.getPost);
router.get("/limit", postController.getPostLimit);
router.get("/newpost", postController.getNewPost);

router.use(verifyToken);
router.post("/create-new", postController.CreateNewPost);
router.get("/post-byid", postController.getPostById);

export default router;
