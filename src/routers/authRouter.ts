import { Router } from "express";
import validateSchema from "../middlewares/validateSchema";
import { newUserSchema } from "../schemas/authSchemas";
import * as authController from '../controllers/authControllers'

const authRouter = Router()

authRouter.post('/signup',validateSchema(newUserSchema),authController.createUser)

export default authRouter