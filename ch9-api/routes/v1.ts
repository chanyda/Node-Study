import express from "express";
import { verifyToken } from "../middlewares";
import { createToken, tokenTest } from "../controllers/v1";

const router = express.Router();

router.post("/token", createToken);
router.get("/test", verifyToken, tokenTest);

export default router;
