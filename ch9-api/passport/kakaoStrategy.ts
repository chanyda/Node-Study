import passport, { Profile } from "passport";
import { Strategy as KakaoStrategy } from "passport-kakao";
import User from "../models/user";

export const kakao = () => {
    try {
        if (!process.env.KAKAO_ID) {
            throw new Error("env not setting");
        }

        passport.use(
            new KakaoStrategy(
                {
                    clientID: process.env.KAKAO_ID,
                    callbackURL: "/auth/kakao/callback",
                },
                async (accessToken: string, refreshToken: string, profile: any, done: any) => {
                    // 사용자 정보를 담고 있지만, 리턴해주는 값이 달라질 수 있으므로 콘솔을 찍자.
                    console.log("profile:", profile);
                    try {
                        const existedUser = await User.findOne({
                            where: {
                                sns_id: profile.id,
                                provider: "kakao",
                            },
                        });

                        // User가 존재하지 않으면 회원가입 처리한다.
                        if (!existedUser) {
                            const newUser = await User.create({
                                email: profile._json.kakao_account.email,
                                nick: profile.displayName,
                                sns_id: profile.id,
                                provider: "kakao",
                            });

                            done(null, newUser);
                        } else {
                            done(null, existedUser);
                        }
                    } catch (err: any) {
                        console.error(err);
                    }
                }
            )
        );
    } catch (err: any) {
        console.error(err);
    }
};
