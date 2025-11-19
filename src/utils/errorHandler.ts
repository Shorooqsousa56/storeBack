import {Response} from "express";

export function errorHandler(err:unknown,res:Response){

     if(err instanceof Error){
            res.status(500).json({error: err.message})}
            else { res.status(500).json({error: err})}
}