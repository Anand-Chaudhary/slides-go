import UserModel, {User} from "../models/user.model";

interface CreateUser{
    username: string
    email: string
    password: string
}

export const createUser = async ({username, email, password}: CreateUser): Promise<User> =>{
    if(!username || !email || !password){
        throw new Error("All the fields are required")
    }

    const existingUser = await UserModel.findOne({email})

    if(existingUser){
        throw new Error("User exists")
    }

    const user = await UserModel.create({
        username, email, password
    })

    return user;
}