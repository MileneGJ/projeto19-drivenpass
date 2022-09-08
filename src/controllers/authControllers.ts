import { Request,Response } from "express";
import * as authService from '../services/authServices'

export async function createUser (req: Request,res: Response) {
    await authService.addNewUser(req.body)
    return res.sendStatus(201)
}

