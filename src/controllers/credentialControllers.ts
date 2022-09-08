import { Request, Response } from "express";
import * as credentialService from '../services/credentialServices'

export async function createCredential (req: Request, res: Response) {
    const userId = res.locals.id
    await credentialService.newCredential(req.body,userId)
    res.sendStatus(201)
}

export async function getAllCredentials (req: Request, res: Response) {
    const userId = res.locals.id
    const credentials = await credentialService.getAllCredentials(userId)
    res.status(200).send(credentials)
}