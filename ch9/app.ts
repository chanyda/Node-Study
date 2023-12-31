import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import nunjucks from "nunjucks";
import dotenv from "dotenv";
import pageRouter from "./routes/page";
import authRouter from "./routes/auth";
import postRouter from "./routes/post";
import userRouter from "./routes/user";
import db from "./models";
import passport from "passport";
import { passportConfig } from "./passport";

dotenv.config();

const app = express();

passportConfig();

app.set("PORT", process.env.PORT || 8001);
app.set("view engine", "html");
nunjucks.configure("views", { express: app, watch: true });

// DB 연결
db.sequelize
    .sync({ force: false })
    .then(() => {
        console.log("DB CONNECT");
    })
    .catch((err: any) => {
        console.error(err);
    });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
// 프론트단에서 서버의 폴더에 접근하기 위해 설정 (img 경로로 uploads 폴더를 가져올 수 있음)
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET)); // 3. {connect.sid: 세션쿠키} 객체를 생성해준다.
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET!,
        cookie: {
            httpOnly: true,
            secure: false,
        },
    })
);
app.use(passport.initialize()); // req.user, req.login, req.isAuthenticate, req.logout이 여기서 생성됨
app.use(passport.session()); // 2. connect.sid라는 이름의 세션 쿠키가 브라우저로 전송 (브라우저 connect.sid=세션쿠키)

app.use((req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return next();
    }

    res.locals.user = req.user;
    res.locals.followerCount = req.user.followers?.length ?? 0;
    res.locals.followingCount = req.user.followings?.length ?? 0;
    res.locals.followingIdList = req.user.followings?.map((following) => following.id) ?? [];
    next();
});

app.use("/", pageRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.url === "/favicon.ico") {
        return;
    }

    const error: any = new Error(`${req.method} ${req.url} Not Found Router`);
    error.status = 404;
    next(error);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.render("error");
});

app.listen(app.get("PORT"), () => {
    console.log(`${app.get("PORT")} listening`);
});
