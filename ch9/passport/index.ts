import passport from "passport";
import User from "../models/user";
import { local } from "./localStrategy";

export const passportConfig = () => {
    console.log("passport index.ts");
    // 로그인 시  실행 -> req.session 객체에 어떤 데이터를 저장할지 정하는 메소드
    passport.serializeUser((user, done) => {
        console.log("passport index.ts -> serializeUser");
        done(null, user.id);
    });
    // 1. user.id만 저장하는 이유: {세션쿠키: 유저아이디}를 메모리에 저장하는데, 모든 User객체를 저장하면 메모리 낭비가 심함.
    // 4. passport에서 세션쿠키를 가지고 유저아이디를 찾는다.

    // 각 요청마다 실행
    // 5. 유저아이디를 통해 User 정보를 찾는다.
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({ where: { id } });
            if (!user) {
                throw new Error("User not exists.");
            }

            // 6. req.user에 저장, connect.sid 쿠키로 세션에서 찾을 때 req.session생성
            // req.session은 사용자간의 공유되는 데이터(같은 사용자면 로그아웃 하기 전까지 데이터가 공유됨)
            done(null, user);
        } catch (err: any) {
            console.error(err);
            done(err);
        }
    });

    local();
};
