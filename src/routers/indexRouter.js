import { Router } from "express";
import authRouter from "./authRouter.js";

//Aqui utilizamos um índice para que todas as rotas sejam chamadas aqui e no app.js apenas a váriavel "router" seja utilizada
const router = Router();

router.use(authRouter);

export default router;