import { NextFunction, Request, Response, request, response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { Transaction } from "sequelize";
import db from "../models";
import passport from "passport";

export const join = async (req: Request, res: Response, next: NextFunction) => {
    let t: Transaction | null = null;
    try {
        const { nick, email, password } = req.body;

        // 기존 회원인지 체크
        const existedUser = await User.count({
            where: {
                email,
            },
        });

        if (existedUser !== 0) {
            return res.redirect("/join?error=exist");
        }

        // 회원 가입 처리를 위한 비밀번호 암호화
        const passwordHash = await bcrypt.hash(password, 12);

        t = await db.sequelize.transaction();

        await User.create(
            {
                email,
                nick,
                password: passwordHash,
            },
            { transaction: t }
        );

        await t?.commit();

        return res.redirect("/");
    } catch (err: any) {
        console.error(err);
        next(err);
    }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
    try {
        passport.authenticate("local", (authError: any, user: User, info: any) => {
            // 만일 서버오류가 발생한 경우
            if (authError) {
                console.error(authError);
                return next(authError);
            }

            // user가 존재하지 않는 경우 -> 로직 오류
            if (!user) {
                return res.redirect(`/?loginError=${info.message}`);
            }

            // 로그인 성공
            return req.login(user, (err: any) => {
                if (err) {
                    console.error(err);
                    return next(err);
                }
                return res.redirect("/");
            });
        })(req, res, next); // 미들웨어이므로, (req, res, next) 붙여야함. -> 미들웨어 확장 패턴 req,res,next를 코드 내부에서 사용하기 위해 확장패턴을 사용
    } catch (err: any) {
        console.error(err);
        next(err);
    }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
    try {
        // 세션 쿠키를 없애줌.
        // 브라우저에는 쿠키가 남아있지만, 서버 쪽에는 세션 쿠키(세션개체)가 없어서 로그인이 안됨
        req.logout(() => {
            res.redirect("/");
        });
    } catch (err: any) {
        console.error(err);
        next(err);
    }
};
