import express, { NextFunction, Request, Response } from "express";
import { Comment } from "../models/comment";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await Comment.create({
            comment: req.body.comment,
            user_id: req.body.id,
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateComment = await Comment.update(
            {
                comment: req.body.comment,
            },
            {
                where: { id: req.params.id },
            }
        );

        res.status(201).json(updateComment);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleteComment = await Comment.destroy({ where: { id: req.params.id } });
        res.status(201).json(deleteComment);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

export default router;
