import express, { NextFunction } from "express";
import { renderJoin, renderMain, renderProfile } from "../controllers/page";
import { isLoggedIn, isNotLoggedIn } from "../middlewares";

const router = express.Router();

router.get("/", renderMain);
router.get("/join", isNotLoggedIn, renderJoin);
router.get("/profile", isLoggedIn, renderProfile);

export default router;
