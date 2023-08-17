import { NextFunction, Request, Response } from "express";
import Domain from "../models/domain";
import User from "../models/user";
import jwt from "jsonwebtoken";

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
                expiresIn: "1m",
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
