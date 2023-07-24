import express, { NextFunction, Request, Response } from "express";
import Comment from "../schemas/comment";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await Comment.create({
            commenter: req.body.id,
            comment: req.body.comment,
        });

        const result = await Comment.populate(comment, { path: "commenter" });
        console.log("createComment Result", result);
        res.status(201).json(result);
    } catch (err: any) {
        console.error(err);
        next(err);
    }
});

router.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Comment.updateOne(
            {
                _id: req.params.id,
            },
            { comment: req.body.comment }
        );

        console.log("update result", result);
        res.status(201).json(result);
    } catch (err: any) {
        console.error(err);
        next(err);
    }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Comment.deleteOne({ _id: req.params.id });
        console.log("delete result", result);

        res.status(201).json(result);
    } catch (err: any) {
        console.error(err);
        next(err);
    }
});

export default router;
