import { Request, Response } from "express";
import * as documentService from '../services/documentServices'

export async function createDocument (req: Request, res:Response) {
    const {userId} = res.locals
    await documentService.addNewDocument(req.body,userId)
    res.sendStatus(201)
}