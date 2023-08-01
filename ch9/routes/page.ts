import express from "express";
import { renderHashtag, renderJoin, renderMain, renderProfile } from "../controllers/page";
import { isLoggedIn, isNotLoggedIn } from "../middlewares";

const router = express.Router();

router.get("/", renderMain);
router.get("/join", isNotLoggedIn, renderJoin);
router.get("/profile", isLoggedIn, renderProfile);
router.get("/hashtag", renderHashtag);

export default router;
