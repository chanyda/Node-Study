import { Sequelize } from "sequelize";
import { dbConfig } from "../config/dbConfig";
import path from "path";
import fs from "fs";

const env = process.env.NODE_ENV || "development";
const { database, username, password } = dbConfig[env];

let db;
const sequelize = new Sequelize(database, username, password, dbConfig[env]);
db = { sequelize };

const basename = path.basename(__filename); // index.ts 현재 파일
fs.readdirSync(__dirname)
    .filter((file) => file.indexOf(".") !== 0 && file !== basename)
    .forEach((file) => {
        const model = require(path.join(__dirname, file));
        db[model.default] = model;
        model.default.initiate(sequelize);
    });

Object.keys(db).forEach((modelName: string) => {
    if (db[modelName].associate) {
        db[modelName].associate();
    }
});

export default db;
