import { Router } from "express";
import tokenValidation from "../middlewares/tokenValidation";
import validateSchema from "../middlewares/validateSchema";
import { newAnnotationSchema } from "../schemas/annotationSchemas";
import * as annotationController from '../controllers/annotationControllers'

const annotationRouter = Router()

annotationRouter.post('/annotations', tokenValidation, validateSchema(newAnnotationSchema),annotationController.createAnnotation)
annotationRouter.get('/annotations',tokenValidation,annotationController.getAllAnnotations)
annotationRouter.get('/annotations/:annotationId',tokenValidation,annotationController.getOneAnnotation)

export default annotationRouter