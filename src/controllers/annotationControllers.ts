import { Request, Response } from "express";
import * as annotationService from '../services/annotationServices'

export async function createAnnotation (req: Request, res: Response) {
    const {userId} = res.locals
    await annotationService.newAnnotation(req.body,userId)
    res.sendStatus(201)
}

