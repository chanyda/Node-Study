import express, { NextFunction, Request, Response } from "express";
import nunjucks from "nunjucks";
import morgan from "morgan";
import path from "path";
import indexRouter from "./src/routes";
import userRouter from "./src/routes/users";
import commentRouter from "./src/routes/comments";
import { initializeDB } from "./src/database";

const app = express();

app.set("PORT", process.env.PORT || 3001);
app.set("view engine", "html");
nunjucks.configure("./src/views", {
    express: app,
    watch: true,
});

(async () => {
    await initializeDB();
})();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/comments", commentRouter);

app.listen(app.get("PORT"), () => {
    console.log(`${app.get("PORT")} listening`);
});
