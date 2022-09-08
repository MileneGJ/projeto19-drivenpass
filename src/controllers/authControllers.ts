import { Request,Response } from "express";
import * as authService from '../services/authServices'

export async function createUser (req: Request,res: Response) {
    await authService.addNewUser(req.body)
    return res.sendStatus(201)
}

export async function authenticateUser (req: Request, res: Response) {
    const token = await authService.newLogin(req.body);
    return res.status(200).send(token)
}