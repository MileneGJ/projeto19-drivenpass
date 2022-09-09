import { Request, Response } from "express";
import * as cardService from '../services/cardServices'

export async function createCard (req:Request, res:Response) {
    const {userId} = res.locals
    await cardService.addCard(req.body,Number(userId))
    res.sendStatus(201)
}

export async function getAllCards (req: Request, res: Response) {
    const {userId} = res.locals
    const cards = await cardService.getAllCards(userId)
    res.status(200).send(cards)
}