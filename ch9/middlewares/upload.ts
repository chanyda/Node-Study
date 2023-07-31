import { Request } from "express";
import multer from "multer";
import path from "path";

export const uploadImageMiddleware = multer({
    // diskStorage에 저장
    storage: multer.diskStorage({
        destination(req: Request, file: Express.Multer.File, cb: any) {
            cb(null, "uploads/");
        },
        filename(req: Request, file: Express.Multer.File, cb: any) {
            console.log("file:", file);
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    // 파일 최대 크기 설정
    limits: { fileSize: 5 * 1024 * 1024 },
}).single("img");
