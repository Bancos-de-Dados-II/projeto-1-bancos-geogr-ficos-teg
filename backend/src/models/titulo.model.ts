import { DataTypes } from "sequelize";
import db from "../config/db";

const Titulo = db.define(
  "Titulo",
  {
    nome: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    clubeId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    conquistas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "titulos",
    timestamps: false,
  },
);
export default Titulo;
