import express, { Request, Response } from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares";
import { join, login, logout } from "../controllers/auth";
import passport from "passport";

const router = express.Router();

router.post("/join", isNotLoggedIn, join);
router.post("/login", isNotLoggedIn, login);
router.get("/logout", isLoggedIn, logout);

// [GET] /auth/kakao 1. 카카오톡 로그인 화면으로 redirect
router.get("/kakao", passport.authenticate("kakao"));

// /auth/kakao -> 카카오톡 로그인 화면 -> /auth/kakao/callback
// [GET] /auth/kakao/callback 2. 카카오톡 로그인 완료되면 해당 url로 redirect 해줌
router.get(
    "/kakao/callback",
    passport.authenticate("kakao", { failureFlash: "/?loginError=Kakao Login Failed." }),
    (req: Request, res: Response) => {
        console.log("end");
        res.redirect("/");
    }
);

export default router;
