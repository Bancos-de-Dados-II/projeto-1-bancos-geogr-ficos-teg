import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(
  process.env.DATABASE_URL ||
    "postgres://postgres:postgres@localhost:5432/sequelize",
);

export default db;
