import { Router } from "express";
import validateSchema from "../middlewares/validateSchema";
import { newCredentialSchema } from "../schemas/credentialSchemas";
import * as credentialController from '../controllers/credentialControllers'
import tokenValidation from "../middlewares/tokenValidation";

const credentialRouter = Router()

credentialRouter.post('/credentials',tokenValidation,validateSchema(newCredentialSchema),credentialController.createCredential)
credentialRouter.get('/credentials',tokenValidation,credentialController.getAllCredentials)
credentialRouter.get('/credentials/:credentialId',tokenValidation,credentialController.getOneCredential)
credentialRouter.delete('/credentials/:credentialId',tokenValidation,credentialController.deleteOneCredential)

export default credentialRouter