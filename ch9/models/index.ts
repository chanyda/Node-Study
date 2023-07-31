import { Sequelize } from "sequelize";
import { dbConfig } from "../config/dbConfig";
import User from "./user";
import Post from "./post";
import Hashtag from "./hashtag";

const env = process.env.NODE_ENV || "development";
const { database, username, password } = dbConfig[env];

let db;
const sequelize = new Sequelize(database, username, password, dbConfig[env]);
db = { sequelize };

User.initiate(sequelize);
Post.initiate(sequelize);
Hashtag.initiate(sequelize);

User.associate();
Post.associate();
Hashtag.associate();

export default db;
