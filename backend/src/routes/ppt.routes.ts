import { authUser } from '../middlewares/auth.middleware'
import * as pptController from '../services/ppt.service'
import express from 'express'

const router = express.Router()

router.get('/get-ppt', authUser, pptController.getPPT)

router.get('/get-all-ppt', authUser, pptController.getAllPPT)

router.post('/convert-ppt', pptController.convertPPT)

export default router
