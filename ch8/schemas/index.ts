import mongoose from "mongoose";

// connect 함수 실행 시 mongoose 연결
const connect = () => {
    if (process.env.NODE_ENV !== "production") {
        mongoose.set("debug", true); // 콘솔에서 쿼리 확인
    }

    try {
        // id:password@localhost~ 로그인을 위한 DB
        mongoose.connect("mongodb://root:chany0000@localhost:27017/admin", {
            dbName: "nodejs", // 실제로 데이터 저장할 DB
            autoIndex: true,
        });
    } catch (err: any) {
        if (err) {
            console.log("mongodb connect error", err);
        } else {
            console.log("mongodb connect success");
        }
    }
};

mongoose.connection.on("error", (err: any) => {
    console.error("mongodb connect error", err);
});

mongoose.connection.on("disconnection", () => {
    console.log("mongodb disconnection");
    connect();
});

export default connect;
