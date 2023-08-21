import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import nunjucks from "nunjucks";
import dotenv from "dotenv";

dotenv.config();
import indexRouter from "./routes/index";

const app = express();

app.set("PORT", process.env.PORT || 4000);
app.set("view engine", "html");
nunjucks.configure("views", { express: app, watch: true });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
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

app.use("/", indexRouter);

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
