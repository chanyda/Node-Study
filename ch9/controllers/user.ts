import { NextFunction, Request, Response } from "express";
import User from "../models/user";

export const follow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // req.user.id -> 내 아이디, req.params.id -> 팔로잉할 아이디
        const user = await User.findOne({
            where: {
                id: req.user?.id,
            },
        });
        if (!user) {
            return res.status(404).send("Not found user.");
        }

        await user.addFollowing(parseInt(req.params.id));

        res.send("Success");
    } catch (err: any) {
        console.error(err);
        next(err);
    }
};
