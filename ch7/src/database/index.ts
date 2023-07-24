import { Sequelize } from "sequelize";
import { dbConfig } from "../../config";
import { User, initializeUser } from "../models/user";
import { Comment, initializeComment } from "../models/comment";

let db: Sequelize | null = null;
export async function initializeDB() {
    console.log("initalizDB");
    const env = process.env.ENV || "development";
    const { database, username, password } = dbConfig[env as keyof typeof dbConfig];

    const sequelize = new Sequelize(database, username, password, dbConfig[env as keyof typeof dbConfig]);

    initializeUser(sequelize);
    initializeComment(sequelize);

    // 관계 정의
    Comment.belongsTo(User, { foreignKey: "user_id", as: "users" });

    try {
        await sequelize.sync({ force: false });
    } catch (err) {
        console.error(err);
    }

    db = sequelize;
}

export { db };
