import express from "express";
import { isLoggedIn } from "../middlewares";
import fs from "fs";
import { uploadImageMiddleware } from "../middlewares/upload";
import { deletePost, uploadImage, uploadPost } from "../controllers/post";
import multer from "multer";

const router = express.Router();

// uploads 폴더 생성
try {
    fs.readdirSync("uploads");
} catch (err: any) {
    // uploads 폴더가 없다면 생성해준다.
    fs.mkdirSync("uploads");
}

router.post("/", isLoggedIn, multer().none(), uploadPost);
router.post("/img", isLoggedIn, uploadImageMiddleware, uploadImage);
router.delete("/:id", isLoggedIn, deletePost);

export default router;
