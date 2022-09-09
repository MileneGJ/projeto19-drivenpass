import { Request, Response } from "express";
import * as wifiService from '../services/wifiServices'

export async function createWifi (req: Request, res: Response) {
    const {userId} = res.locals
    await wifiService.addNewWifi(req.body,userId)
    res.sendStatus(201)
}