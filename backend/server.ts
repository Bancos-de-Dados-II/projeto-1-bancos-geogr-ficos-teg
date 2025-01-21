import express from "express";
import cors from "cors";
import route from "./routes/routes";
const app = express();

const porta = 3000;
app.use(cors());
app.use(express.json());
app.use(route);

app.listen(porta, ()=>{
    console.log(`Servidor rodando na porta:  ${porta}`)
})
