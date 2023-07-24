import passport from "passport";
import User from "../models/user";

exports = () => {
    console.log("passport index.ts");
    // 로그인 시  실행 -> req.session 객체에 어떤 데이터를 저장할지 정하는 메소드
    passport.serializeUser((user, done) => {
        console.log("passport index.ts -> serializeUser");
        done(null, user.id);
    });

    // 각 요청마다 실행
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({ where: { id } });
            if (!user) {
                throw new Error("User not exists.");
            }

            done(null, user);
        } catch (err: any) {
            console.error(err);
            done(err);
        }
    });
};
