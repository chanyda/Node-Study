import express from "express";
import { deprecated, verifyToken } from "../middlewares";
import { createToken, getMyPosts, getPostsByHashtag, tokenTest } from "../controllers/v1";

const router = express.Router();

// 미들웨어를 router마다 사용하지 않고, 공통되기 때문에 아래처럼 사용
router.use(deprecated);

router.post("/token", createToken);
router.get("/test", verifyToken, tokenTest);

router.get("/posts/my", verifyToken, getMyPosts);
router.get("/posts/hashtag/:title", verifyToken, getPostsByHashtag);

export default router;
