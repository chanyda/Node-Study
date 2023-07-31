import { NextFunction, Request, Response } from "express";
import Post from "../models/post";
import User from "../models/user";

export const renderMain = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ["id", "nick"],
                },
            ],
            order: [["created_at", "DESC"]],
        });

        res.render("main", { title: "NodeBird", twits: posts });
    } catch (err: any) {
        console.error(err);
        next(err);
    }
};

export const renderJoin = (req: Request, res: Response, next: NextFunction) => {
    res.render("join", { title: "회원 가입 - NodeBird" });
};

export const renderProfile = (req: Request, res: Response, next: NextFunction) => {
    res.render("profile", { title: "내 정보 - NodeBird" });
};
