import UserModel from "@/models/user.model";
import bcrypt from 'bcryptjs'
import dbConnect from "@/lib/db";

export async function POST(request:Request) {
    await dbConnect();
    try{
        const {username, email, password} = await request.json();
        const existingUser = await UserModel.findOne({email});
        if (existingUser){
            return Response.json({
                success: false,
                message: "User Existis",
            }, {status: 409})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({username, email, password: hashedPassword});
        await newUser.save();
        return Response.json({
            success: true,
            message: "User Created Successfully"
        }, {status: 201})
    } catch(err){
        console.log("Error Creating User: ", err);
        return Response.json({
            success: false,
            message: "Error Creating user"
        }, {status: 404})
    }
}