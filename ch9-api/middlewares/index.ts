import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import User from "../models/user";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    // passport 통해서 로그인 했는지 여부 체그
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send("Need to login.");
    }
};

export const isNotLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent("Already login.");
        res.redirect(`/?error=${message}`);
    }
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers?.authorization) {
            throw new Error("authorization not found.");
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("env not setting.");
        }

        res.locals.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    } catch (err: any) {
        // 만료된 토큰인 경우
        if (err.name === "TokenExpiredError") {
            return res.status(419).json({
                code: 419,
                message: "토큰이 만료되었습니다.",
            });
        }

        return res.status(401).json({
            code: 401,
            message: "유효하지 않는 토큰입니다.",
        });
    }
};

const limiter = rateLimit({
    windowMs: 60 * 10000,
    max: (req: Request, res: Response) => {
        if (req.user?.type === "premium") {
            return 100;
        }
        return 10;
    },
    handler(_: Request, _res: Response) {
        _res.status(this.statusCode).json({
            code: this.statusCode,
            message: "사용 횟수를 초과했습니다.",
        });
    },
});

// 디도스 공격에는 효과가 없을 수 있음.
// 미들웨어 확장패턴
export const apiLimiter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user: User | null = null;
        if (res.locals.decoded?.id) {
            user = await User.findOne({ where: { id: res.locals.decoded.id } });
            if (user) {
                req.user = user;
            }
        }

        limiter(req, res, next);
    } catch (err: any) {
        next(err);
    }
};

/**
 * 버전이 올라가면서 사용하면 안되는 API에 대해서 deprecated 함수를 구현
 * @param req
 * @param res
 */
export const deprecated = (req: Request, res: Response) => {
    res.status(410).json({ code: 410, message: "새로운 버전이 나왔습니다. 새로운 버전을 이용해주세요." });
};
