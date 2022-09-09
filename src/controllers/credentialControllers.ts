import { Request, Response } from "express";
import * as credentialService from '../services/credentialServices'

export async function createCredential (req: Request, res: Response) {
    const {userId} = res.locals
    await credentialService.addNewCredential(req.body,userId)
    res.sendStatus(201)
}

export async function getAllCredentials (req: Request, res: Response) {
    const {userId} = res.locals
    const credentials = await credentialService.getAllCredentials(userId)
    res.status(200).send(credentials)
}

export async function getOneCredential (req: Request, res: Response) {
    const {userId} = res.locals
    const {credentialId} = req.params
    const credential = await credentialService.getOneCredential(Number(credentialId),userId)
    res.status(200).send(credential)
}

export async function deleteOneCredential (req: Request, res:Response) {
    const {userId} = res.locals
    const {credentialId} = req.params
    await credentialService.deleteCredential(Number(credentialId), userId)
    res.sendStatus(204)
}