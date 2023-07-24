import express, { NextFunction, Request, Response } from "express";
import User from "../schemas/user";
import Comment from "../schemas/comment";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err: any) {
        console.error(err);
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
        console.log("create user", user);
        res.status(201).json(user);
    } catch (err: any) {
        console.error(err);
        next(err);
    }
});

router.get("/:id/comments", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comments = await Comment.find({ commenter: req.params.id });
        console.log("comments", comments);
        res.status(200).json(comments);
    } catch (err: any) {
        console.error(err);
        next(err);
    }
});

export default router;
