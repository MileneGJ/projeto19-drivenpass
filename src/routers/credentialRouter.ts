import { Router } from "express";
import validateSchema from "../middlewares/validateSchema";
import { newCredentialSchema } from "../schemas/credentialSchemas";
import * as credentialController from '../controllers/credentialControllers'
import tokenValidation from "../middlewares/tokenValidation";

const credentialRouter = Router()

credentialRouter.post('/credentials/create',tokenValidation,validateSchema(newCredentialSchema),credentialController.createCredential)
credentialRouter.get('/credentials')
credentialRouter.get('/credentials/:credentialId')

export default credentialRouter