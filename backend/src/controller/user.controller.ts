import UserModel, {UserModelInterface} from "../models/user.model";
import * as userService from '../services/user.service'
import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const registerUser = async (req: Request, res: Response) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        throw new Error("User not registered")
    }

    const {username, email, password} = req.body;

    const hashedPassword: string = await UserModel.hashPassword(password);

    const user = await userService.createUser({
        username, email, password: hashedPassword
    })

    const token = await user.generateAuthToken();

    return res.status(201).json({
        success: true,
        message: "User Created Successfully",
        user,
        token
    })
}