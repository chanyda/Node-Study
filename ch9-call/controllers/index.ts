import { Request, Response, NextFunction } from "express";
import axios from "axios";

// export const test = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         console.log("session", req.session);

//         if (!req.session["jwt"]) {
//             const tokenResult = await axios.post("http://localhost:8002/v1/token", {
//                 clientSecret: process.env.CLIENT_SECRET,
//             });

//             if (tokenResult.data?.code === 200) {
//                 req.session["jwt"] = tokenResult.data.token;
//             } else {
//                 return res.status(tokenResult.data.code).json(tokenResult.data);
//             }
//         }

//         const result = await axios.get("http://localhost:8002/v1/test", {
//             headers: {
//                 authorization: req.session["jwt"],
//             },
//         });

//         return res.json(result.data);
//     } catch (err: any) {
//         console.error(err);
//         if (err.response?.status === 419) {
//             return res.json(err.response.data);
//         }

//         return next(err);
//     }
// };

const URL = process.env.API_URL;
axios.defaults.headers.common.origin = process.env.ORIGIN;

const request = async (req: Request, api: any) => {
    try {
        console.log("SESSION", req.session);

        // session에 token이 없으면 발급 받자.
        if (!req.session["jwt"]) {
            const tokenResult = await axios.post(`${URL}/token`, {
                clientSecret: process.env.CLIENT_SECRET,
            });

            req.session["jwt"] = tokenResult.data.token;
        }

        return await axios.get(`${URL}${api}`, {
            headers: { authorization: req.session["jwt"] },
        });
    } catch (err: any) {
        // 유효기간 지난 경우 세션에서 삭제 후 다시 request 함수 호출하여 token 발급
        if (err.response?.status === 419) {
            delete req.session["jwt"];
            return request(req, api);
        }

        throw err.response;
    }
};

export const getMyPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await request(req, "/posts/my");
        res.json(result.data);
    } catch (err: any) {
        console.error(err);
        next(err);
    }
};

export const searchByHashtag = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await request(req, `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`);
        res.json(result.data);
    } catch (err: any) {
        console.error(err);
        next(err);
    }
};
