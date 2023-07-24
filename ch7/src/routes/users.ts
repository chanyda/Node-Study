import express, { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { Comment } from "../models/comment";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.create({
            name: req.body.name,
            age: req.body.age,
            married: req.body.married,
        });
        console.log("user", user);

        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
});

router.get("/:id/comments", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comments = await Comment.findAll({
            include: {
                model: User,
                as: "users",
                where: {
                    id: req.params.id,
                },
            },
        });

        console.log(comments);
        res.status(200).json(comments);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

export default router;
