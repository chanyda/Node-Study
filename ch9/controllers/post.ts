import { NextFunction, Request, Response } from "express";
import Post from "../models/post";
import Hashtag from "../models/hashtag";

export const uploadImage = (req: Request, res: Response, next: NextFunction) => {
    try {
        // multer 설정을 single로 했기 때문에 req.file에 업로드한 파일이 담김
        // array, field는 req.files에 담김
        console.log("req.file", req.file);

        // 프론트 단에 url을 보내줌.
        res.json({ url: `/img/${req.file?.filename}` });
    } catch (err: any) {
        console.error(err);
        next(err);
    }
};

export const uploadPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post = await Post.create({
            content: req.body?.content,
            img: req.body?.url,
            UserId: req.user?.id,
        });

        // # 다음에 공백 | #이 아닌 나머지를 추출
        const hashtags = req.body?.content.match(/#[^\s#]*/g);
        console.log(hashtags);

        if (hashtags) {
            const createHashtag = hashtags.map((hashtag: string) => {
                return Hashtag.findOrCreate({
                    where: { title: hashtag.slice(1).toLowerCase() },
                });
            });

            const result = await Promise.allSettled(createHashtag);
            await post.addHashtags(
                result.map((r) => {
                    if (r.status === "fulfilled") {
                        return r.value[0];
                    }
                })
            );
        }

        res.redirect("/");
    } catch (err: any) {
        console.error(err);
        next(err);
    }
};
