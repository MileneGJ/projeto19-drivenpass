import { Router } from "express";
import tokenValidation from "../middlewares/tokenValidation";
import * as wifiController from '../controllers/wifiControllers'
import validateSchema from "../middlewares/validateSchema";
import { newWifiSchema } from "../schemas/wifiSchemas";

const wifiRouter = Router()

wifiRouter.post('/wifis',tokenValidation,validateSchema(newWifiSchema),wifiController.createWifi)
wifiRouter.get('/wifis',tokenValidation,wifiController.getAllWifis)

export default wifiRouter