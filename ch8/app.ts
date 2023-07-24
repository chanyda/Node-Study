import express, { NextFunction, Request, Response } from "express";
import path from "path";
import morgan from "morgan";
import nunjucks from "nunjucks";

import connect from "./schemas";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import commentsRouter from "./routes/comments";

const app = express();
app.set("port", process.env.PORT || 3002);
app.set("view engine", "html");
nunjucks.configure("views", {
    express: app,
    watch: true,
});
connect();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/comments", commentsRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기 중");
});
