// {
//   "development": {
//     "username": "root",
//     "password": null,
//     "database": "database_development",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }

interface IDbConfig {
    development: {
        username: string;
        password: string;
        database: string;
        host: string;
        [key: string]: string;
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
