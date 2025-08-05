import jwt from "jsonwebtoken";
import UserModel, { User } from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import BlacklistTokenModel from "../models/blacklistToken.model";

declare global{
    namespace Express{
        interface Request{
            user?: User | null
        }
    }
}

export const authUser = async (req: Request, res: Response, next: NextFunction) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    if(!token){
        return res.status(400).json({
            success: false,
            message: "Unauthorized User"
        })
    }

    const isBlackListed = await BlacklistTokenModel.findOne({token})

    if(isBlackListed){
        return res.status(401).json({
            success: false,
            message: "User not authorized"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {_id: string}
        const user = await UserModel.findById(decoded._id)

        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not Found"
            })
        }

        req.user = user

        next()
    } catch(err){
        return res.status(400).json({
            success: false,
            message: "Unauthorized User"
        })
    }
}