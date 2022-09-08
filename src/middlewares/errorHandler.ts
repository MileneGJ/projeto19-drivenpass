import { Request, Response, NextFunction } from "express";
import { CustomError } from "../typeModels/generalInterfaces";

export default function errorHandler(error: CustomError, req: Request, res: Response, next: NextFunction) {
    switch (error.code) {
        case 'InvalidInput':
            res.status(422).send(error.message);
        case 'Conflict':
            res.status(409).send(error.message);
        case 'NotFound':
            res.status(404).send(error.message);
        case 'Unauthorized':
            res.status(401).send(error.message);
        default:
            console.log(error)
            res.status(500).send('Server encontered an error')
    }
}