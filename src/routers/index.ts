import { Router } from "express";
import annotationRouter from "./annotationRouter";
import authRouter from "./authRouter";
import cardRouter from "./cardRouter";
import credentialRouter from "./credentialRouter";

const router = Router()

router.use(authRouter)
router.use(credentialRouter)
router.use(annotationRouter)
router.use(cardRouter)

export default router