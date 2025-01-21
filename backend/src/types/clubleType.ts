import {tituloType} from "./tituloType"
export interface clubeType {
    id:string
    nome:string;
    tecnico:string;
    presidente:string;
    anoFundacao:number;
    principalRival:string;
    estadio:string;
    escudo?:string;
    titulos: tituloType[];
    geocode: string

}