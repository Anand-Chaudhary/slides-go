import express from "express";
import * as ai from '../controller/ai.controller'
import { authUser } from "../middlewares/auth.middleware";

const router = express.Router();

router.get('/get-response', authUser, ai.getResult)

router.get('/get-images', authUser, ai.generateImageController)

export default router