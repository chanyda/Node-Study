import express, { NextFunction, Response, Request } from "express";
import { User } from "../models/user";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.findAll();
        res.render("sequelize", { users });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

export default router;
