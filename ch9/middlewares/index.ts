import { NextFunction, Request, Response } from "express";

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
