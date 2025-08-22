import express from 'express'
import * as userController from '../controller/user.controller'
import { body } from 'express-validator';
import { authUser } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/register',
    [
        body('email').isEmail().withMessage("Please provide a valid email"),
        body('password').isLength({ min: 3 }).withMessage("Password must be of 3 characters"),
        body('username').isLength({ min: 5 }).withMessage("Username must be of 5 cahracters")
    ],
    userController.registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage("Please provide a valid email"),
    body('password').isLength({ min: 3 }).withMessage("Password must be of 3 characters"),
],
    userController.loginUser
)

router.get('/profile', authUser, userController.getUserProfile)

router.get('/logout', authUser, userController.logoutUser)

export default router