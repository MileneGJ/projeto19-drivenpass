import { Request, Response } from "express";
import * as wifiService from '../services/wifiServices'

export async function createWifi (req: Request, res: Response) {
    const {userId} = res.locals
    await wifiService.addNewWifi(req.body,userId)
    res.sendStatus(201)
}

export async function getAllWifis (req: Request, res: Response) {
    const {userId} = res.locals
    const wifis = await wifiService.getAllWifis(userId)
    res.status(200).send(wifis)
}

export async function getOneWifi (req: Request, res: Response) {
    const {userId} = res.locals
    const {wifiId} = req.params
    const wifi = await wifiService.getOneWifi(Number(wifiId),userId)
    res.status(200).send(wifi)
}

export async function deleteOneWifi (req: Request, res: Response) {
    const {userId} = res.locals
    const {wifiId} = req.params
    await wifiService.deleteWifi(Number(wifiId),userId)
    res.sendStatus(204)
}