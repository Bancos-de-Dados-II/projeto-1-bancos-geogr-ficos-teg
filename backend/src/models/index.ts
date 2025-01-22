import Clube from "./clube.model.js";
import Titulo from "./titulo.model.js";

Titulo.belongsTo(Clube, {
  foreignKey: "clubeId",
  as: "clube",
});

Clube.hasMany(Titulo, {
  foreignKey: "clubeId",
  as: "titulos",
});

export { Clube, Titulo };
