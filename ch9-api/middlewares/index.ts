import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

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
