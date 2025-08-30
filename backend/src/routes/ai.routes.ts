import express from "express";
import * as ai from '../controller/ai.controller'
import { authUser } from "../middlewares/auth.middleware";

const router = express.Router();

router.get('/get-response', authUser, ai.getResult)

router.get('/get-images', authUser, ai.generateImageController)

// New route for complete PPT with images
router.get('/get-complete-ppt', authUser, ai.generateCompletePPT)

export default router