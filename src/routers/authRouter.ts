import { Router } from "express";
import validateSchema from "../middlewares/validateSchema";
import { loginSchema, newUserSchema } from "../schemas/authSchemas";
import * as authController from '../controllers/authControllers'

const authRouter = Router()

authRouter.post('/signup',validateSchema(newUserSchema),authController.createUser);
authRouter.post('/signin',validateSchema(loginSchema),authController.authenticateUser)

export default authRouter