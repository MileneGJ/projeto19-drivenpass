import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { IUserToken } from '../typeModels/authInterfaces';

export default function tokenValidation (req: Request, res: Response, next: NextFunction) {
    const {authorization} = req.headers
    const token = authorization?.replace('Bearer ','')
    const secret = process.env.TOKEN_SECRET || 'secret'
    const id = jwt.verify(token as string,secret,jwtHandler as any)
    res.locals.id = id
    next()
}

function jwtHandler (error:string|undefined, decoded:IUserToken|undefined):number {
    if (error) throw {code:'Unauthorized',message:"Token inválido"};
    const success =  decoded as IUserToken
    return success.id;
}