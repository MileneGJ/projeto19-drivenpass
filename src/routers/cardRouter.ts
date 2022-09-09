import { Router } from "express";
import tokenValidation from "../middlewares/tokenValidation";
import validateSchema from "../middlewares/validateSchema";
import { newCardSchema } from "../schemas/cardSchemas";
import * as cardController from '../controllers/cardControllers'

const cardRouter = Router()

cardRouter.post('/cards',tokenValidation,validateSchema(newCardSchema),cardController.createCard)
cardRouter.get('/cards',tokenValidation,cardController.getAllCards)
cardRouter.get('/cards/:cardId',tokenValidation,cardController.getOneCard)
cardRouter.delete('/cards/:cardId',tokenValidation,cardController.deleteOneCard)

export default cardRouter