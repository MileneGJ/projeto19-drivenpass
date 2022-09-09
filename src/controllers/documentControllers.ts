import { Request, Response } from "express";
import * as documentService from '../services/documentServices'

export async function createDocument (req: Request, res:Response) {
    const {userId} = res.locals
    await documentService.addNewDocument(req.body,userId)
    res.sendStatus(201)
}

export async function getAllDocuments (req: Request, res:Response) {
    const {userId} = res.locals
    const documents = await documentService.getAllDocuments(userId)
    res.status(200).send(documents)
}

export async function getOneDocument (req: Request, res:Response) {
    const {userId} = res.locals
    const {documentId} = req.params
    const document = await documentService.getOneDocument(Number(documentId),userId)
    res.status(200).send(document)
}

export async function deleteOneDocument (req: Request, res:Response) {
    const {userId} = res.locals
    const {documentId} = req.params
    await documentService.deleteDocument(Number(documentId),userId)
    res.sendStatus(204)
}