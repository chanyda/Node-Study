import { NextFunction, Request, Response } from "express";
import Post from "../models/post";
import User from "../models/user";
import Hashtag from "../models/hashtag";

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

// hashtag?hashtag=고양이 검색
export const renderHashtag = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query;
        // hashtag 검색하지 않으면 메인페이지로 리다이렉트 처리
        if (!query?.hashtag) {
            return res.redirect("/");
        }

        const hashtag = await Hashtag.findOne({
            where: {
                title: query.hashtag,
            },
        });

        let posts: Array<Post> = [];
        if (hashtag) {
            posts = await hashtag.getPosts({
                include: [{ model: User, attributes: ["id", "nick"] }],
                order: [["created_at", "DESC"]],
            });
        }

        res.render("main", {
            title: `${query.hashtag} | NodeBird`,
            twits: posts,
        });
    } catch (err: any) {
        console.error(err);
    }
};
