import express from "express";
import { verifyToken, apiLimiter } from "../middlewares";
import { createToken, getMyPosts, getPostsByHashtag, tokenTest } from "../controllers/v2";

const router = express.Router();

router.post("/token", apiLimiter, createToken);
router.get("/test", verifyToken, apiLimiter, tokenTest);

router.get("/posts/my", verifyToken, apiLimiter, getMyPosts);
router.get("/posts/hashtag/:title", apiLimiter, getPostsByHashtag);

export default router;
