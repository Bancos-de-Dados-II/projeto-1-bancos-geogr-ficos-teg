import { DataTypes } from "sequelize";
import db from "../config/db";

const Clube = db.define(
  "Clube",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tecnico: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    presidente: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    anoFundacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    principalRival: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    estadio: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    geocode: {
      type: DataTypes.GEOMETRY("POINT", 4326), // Geometry type
      allowNull: false,
    },
    escudo_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "clubes",
    timestamps: false,
  },
);
export default Clube;
