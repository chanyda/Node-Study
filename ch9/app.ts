import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import nunjucks from "nunjucks";
import dotenv from "dotenv";
import pageRouter from "./routes/page";
import authRouter from "./routes/auth";
import db from "./models";
import passport from "passport";
// import passportConfig from "./passport";

dotenv.config();

const app = express();

// passportConfig();

app.set("PORT", process.env.PORT || 8001);
app.set("view engine", "html");
nunjucks.configure("views", { express: app, watch: true });

// DB 연결
db.sequelize
    .sync({ force: true })
    .then(() => {
        console.log("DB CONNECT");
    })
    .catch((err: any) => {
        console.error(err);
    });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
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
app.use(passport.session()); // connect.sid라는 이름의 세션 쿠키가 브라우저로 전송

app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.user = null;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followingIdList = [];
    next();
});

app.use("/", pageRouter);
app.use("/auth", authRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`${req.method} ${req.url} Not Found Router`);
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
