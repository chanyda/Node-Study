import express from "express";
import { verifyToken } from "../middlewares";
import { createToken, getMyPosts, getPostsByHashtag, tokenTest } from "../controllers/v1";

const router = express.Router();

router.post("/token", createToken);
router.get("/test", verifyToken, tokenTest);

router.get("/posts/my", verifyToken, getMyPosts);
router.get("/posts/hashtag/:title", verifyToken, getPostsByHashtag);

export default router;
