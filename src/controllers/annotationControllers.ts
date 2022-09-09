import { Request, Response } from "express";
import * as annotationService from '../services/annotationServices'

export async function createAnnotation (req: Request, res: Response) {
    const {userId} = res.locals
    await annotationService.addNewAnnotation(req.body,userId)
    res.sendStatus(201)
}

export async function getAllAnnotations (req: Request, res: Response) {
    const {userId} = res.locals
    const annotations = await annotationService.getAllAnnotations(userId)
    res.status(200).send(annotations)
}

export async function getOneAnnotation (req: Request, res: Response) {
    const {userId} = res.locals
    const {annotationId} = req.params
    const annotation = await annotationService.getOneAnnotation(Number(annotationId),userId)
    res.status(200).send(annotation)
}

export async function deleteOneAnnotation (req: Request, res:Response) {
    const {userId} = res.locals
    const {annotationId} = req.params
    await annotationService.deleteAnnotation(Number(annotationId), userId)
    res.sendStatus(204)
}