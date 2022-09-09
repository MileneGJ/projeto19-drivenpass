import { Router } from "express";
import tokenValidation from "../middlewares/tokenValidation";
import * as documentController from '../controllers/documentControllers'
import validateSchema from "../middlewares/validateSchema";
import { newDocumentSchema } from "../schemas/documentSchemas";

const documentRouter = Router()

documentRouter.post('/documents',tokenValidation,validateSchema(newDocumentSchema),documentController.createDocument)
documentRouter.get('/documents',tokenValidation,documentController.getAllDocuments)

export default documentRouter