import dotenv from "dotenv";
import db from "./config/db";
import app from "./app";
import { Clube } from "./models";

dotenv.config();

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await db.authenticate();
    console.log("Database connected!");

    await Clube.sync();
    await db.sync({ force: true, alter: true });

    console.log("Models synchronized!");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
})();
