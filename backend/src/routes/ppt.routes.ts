import { authUser } from '../middlewares/auth.middleware'
import * as pptController from '../services/ppt.service'
import express from 'express'

const router = express.Router()

router.get('/get-ppt', authUser, pptController.getPPT)

export default router
