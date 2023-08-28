import { NextFunction, Request, Response } from "express";
import Domain from "../models/domain";
import User from "../models/user";
import jwt from "jsonwebtoken";
import Post from "../models/post";
import Hashtag from "../models/hashtag";

export const createToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("env not setting.");
        }

        // client secret key를 이용하여 token 발급
        const clientSecret = req.body?.clientSecret;

        if (!clientSecret) {
            return res.status(404).json({
                code: 404,
                message: "client secret not exists.",
            });
        }

        const domain = await Domain.findOne({
            include: [
                {
                    model: User,
                    attributes: ["id", "nick"],
                },
            ],
            where: {
                client_secret: clientSecret,
            },
        });

        if (!domain) {
            return res.status(404).json({
                code: 404,
                message: "등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요.",
            });
        }

        // 토큰 발급
        const token = jwt.sign(
            {
                id: domain.dataValues.User.id,
                nick: domain.dataValues.User.nick,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "30m", // 30분으로 늘림
                issuer: "chany",
            }
        );

        return res.json({ code: 200, message: "토큰이 발급되었습니다", token });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({
            code: 500,
            message: "server error",
        });
    }
};

export const tokenTest = (req: Request, res: Response, next: NextFunction) => {
    try {
        // 토큰 내용 프론트에 표시
        res.json(res.locals.decoded);
    } catch (err: any) {
        console.error(err);
    }
};

export const getMyPosts = (req: Request, res: Response) => {
    Post.findAll({
        where: {
            user_id: res.locals.decoded.id,
        },
    })
        .then((posts) => {
            res.json({
                code: 200,
                payload: posts,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                code: 500,
                message: "Server Error!",
            });
        });
};

export const getPostsByHashtag = async (req: Request, res: Response) => {
    try {
        const hashtag = await Hashtag.findOne({
            where: {
                title: req.params.title,
            },
        });

        if (!hashtag) {
            return res.status(404).json({ code: 404, message: "Not Found Hashtag." });
        }

        const posts = await hashtag.getPosts();
        if (posts.length === 0) {
            return res.status(404).json({ code: 404, message: "Not Found Posts." });
        }

        return res.json({ code: 200, payload: posts });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ code: 500, message: "Server Error!" });
    }
};
