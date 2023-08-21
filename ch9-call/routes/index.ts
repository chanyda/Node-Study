import express from "express";
import { getMyPosts, searchByHashtag } from "../controllers";

const router = express.Router();

// router.get("/test", test);
router.get("/myposts", getMyPosts);
router.get("/search/:hashtag", searchByHashtag);

export default router;
