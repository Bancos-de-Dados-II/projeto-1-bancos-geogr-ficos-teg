import {Request, Response} from "express"
import * as clubeService from "../servers/clubeService";

export const createClube = async(req:Request, res:Response)=>{
    const dados = req.body;
    try {
        const clube = clubeService.createClube(dados);
        res.status(200).json({mensagem: "Cluble criado com sucesso"});
        
    } catch (error) {
        console.log("Error ao tentar criar clube: ", error)
    }
}

export const updateClube = async(req:Request, res:Response)=>{
    const id = req.params.id;
    const dados = req.body
    try {
        const clube = clubeService.updateClube(id, dados);
        res.status(200).json({mensagem: "Cluble atualizado com sucesso"});
        
    } catch (error) {
        console.log("Error ao tentar atualizar dados do clube: ", error)
    }
}

export const deleteClube = async (req:Request, res:Response)=>{
    const id = req.params.id;
    try{
        const clube = await clubeService.deleteClube(id);
        res.status(200).json({mensagem: "Cluble excluido com sucesso"});

    }catch(error){
        console.log("Erro ao excluir um clube:" ,  error)
    }
}