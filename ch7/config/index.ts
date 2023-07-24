import { Dialect } from "sequelize";

interface IDbConfig {
  development: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
  };
}

const dbConfig: IDbConfig = {
  development: {
    username: "root",
    password: "chany0000",
    database: "nodejs",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

export { dbConfig };
