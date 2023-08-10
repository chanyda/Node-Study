import express from "express";
import { isLoggedIn } from "../middlewares";
import { follow, unfollow } from "../controllers/user";

const router = express.Router();

router.post("/:id/follow", isLoggedIn, follow);
router.delete("/:id/unfollow", isLoggedIn, unfollow);

export default router;
