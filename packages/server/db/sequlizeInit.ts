import { Sequelize, SequelizeOptions } from "sequelize-typescript";

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env;

const sequelizeOptions: SequelizeOptions = {
  host: "localhost",
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: "postgres",
  models: ["./../models"],
};

// Создаем инстанс Sequelize
export default new Sequelize(sequelizeOptions);
