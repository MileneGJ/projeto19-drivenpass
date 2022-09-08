import { Router } from "express";
import annotationRouter from "./annotationRouter";
import authRouter from "./authRouter";
import credentialRouter from "./credentialRouter";

const router = Router()

router.use(authRouter)
router.use(credentialRouter)
router.use(annotationRouter)

export default router