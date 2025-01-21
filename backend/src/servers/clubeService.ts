import express from "express";
import {prisma} from "../config/prisma";
import { clubeType } from "../types/clubleType";

export const createClube = async(clube:clubeType)=>{
    const createClube =  await prisma.$executeRaw`
        INSERT INTO clubes VALUES({
            ${clube.nome},
            ${clube.tecnico},
            ${clube.presidente},
            ${clube.anoFundacao},
            ${clube.principalRival},
            ${clube.estadio},
            ${clube.titulos},
            ST_GeomFromText('POINT(${clube.geocode} ${clube.geocode})', 4326).
            ${clube.escudo}
        })
    `
    return createClube;
}

export const updateClube = async(id:string, newClube:clubeType)=>{
    const updateClube = await prisma.clube.update({
        where:{
            id:id
        },
        data:{
            ...newClube
        }
    })
    return updateClube;

}

export const deleteClube = async (id: string)=>{
    const deleteClube = await prisma.clube.delete({
        where:{
            id:id
        }
    })
    return deleteClube;
}