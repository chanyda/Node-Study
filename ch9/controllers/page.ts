import { NextFunction, Request, Response } from "express";

export const renderMain = (req: Request, res: Response, next: NextFunction) => {
    res.render("main", { title: "NodeBird", twits: [] });
};

export const renderJoin = (req: Request, res: Response, next: NextFunction) => {
    res.render("join", { title: "회원 가입 - NodeBird" });
};

export const renderProfile = (req: Request, res: Response, next: NextFunction) => {
    res.render("profile", { title: "내 정보 - NodeBird" });
};
