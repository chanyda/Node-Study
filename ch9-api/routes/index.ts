import express from "express";
import { isLoggedIn } from "../middlewares";
import { createDomain, renderLogin } from "../controllers";

const router = express.Router();

router.get("/", renderLogin);
router.post("/domain", isLoggedIn, createDomain);

export default router;
