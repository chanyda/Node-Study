import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import Domain from "../models/domain";
import { v4 as uuidV4 } from "uuid";

export const renderLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user?.id || null,
            },
            include: { model: Domain },
        });

        res.render("login", {
            user,
            domains: user?.dataValues.Domains,
        });
    } catch (err: any) {
        console.error(err);
        next(err);
    }
};

export const createDomain = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Domain.create({
            UserId: req.user?.id,
            host: req.body.host,
            type: req.body.type,
            client_secret: uuidV4(),
        });

        res.redirect("/");
    } catch (err: any) {
        console.error(err);
        next(err);
    }
};
