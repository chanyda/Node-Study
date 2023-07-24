import express, { NextFunction, Request, Response } from "express";
import User from "../schemas/user";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find({});
        res.render("mongoose", { users });
    } catch (err: any) {
        console.error(err);
        next(err);
    }
});

export default router;
