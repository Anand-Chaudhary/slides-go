import BlacklistTokenModel from "../models/blacklistToken.model";
import UserModel from "../models/user.model";
import * as userService from '../services/user.service'
import { Request, Response } from "express";
import { cookie, validationResult } from "express-validator";

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

export const loginUser = async (req: Request, res: Response) => {
    const error = validationResult(req)

    if(!error.isEmpty()){
        throw new Error("User not registered")
    }

    const {email, password} = req.body;

    const existingUser = await UserModel.findOne({email}).select('+password');

    if(!existingUser){
        return res.status(401).json({
            success: false,
            message: "Email or password incorrect"
        })
    }

    const matched = await existingUser.comparePassword(password)

    if(!matched){
        return res.status(401).json({
            success: false,
            message: "Email or password incorrect"
        })
    }

    const token = await existingUser.generateAuthToken();

    res.cookie("token", token)

    return res.status(201).json({
        success: true,
        message: "Logged In successfully",
        existingUser,
        token
    })
}

export const logoutUser = async (req: Request, res: Response)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    const blacklistToken = await BlacklistTokenModel.create({token})
    await blacklistToken.save()
    return res.status(200).json({
        success: true,
        message: "User Loggedout Successfully"
    })
}