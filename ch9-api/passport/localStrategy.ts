import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/user";
import bcrypt from "bcrypt";

export const local = () => {
    try {
        passport.use(
            new LocalStrategy(
                {
                    usernameField: "email", // req.body.email를 usernameField로 등록
                    passwordField: "password", // req.body.password를 passwordField로 등록
                    passReqToCallback: false, // callback함수에서 req를 사용할 것인가? 만일 true로 하면 async(req, email, password, done) 형식
                },
                // done(서버오류, 성공유저, 로직오류)를 뜻하게 된다.
                async (email, password, done) => {
                    // 로그인 처리
                    try {
                        const existedUser = await User.findOne({
                            where: { email },
                        });

                        if (!existedUser) {
                            return done(null, false, { message: "User not exists." });
                        }

                        // User가 존재하면 비밀번호 확인
                        const passwordCheck = await bcrypt.compare(password, existedUser.password);
                        if (passwordCheck) {
                            done(null, existedUser);
                        } else {
                            done(null, false, { message: "Password is wrong." });
                        }
                    } catch (err: any) {
                        console.error(err);
                        done(err);
                    }
                }
            )
        );
    } catch (err: any) {
        console.error(err);
    }
};
