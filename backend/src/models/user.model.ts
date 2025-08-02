import mongoose, {Document, Schema, Model} from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export interface User extends Document{
    username: string,
    email: string,
    password: string,
    ppts: string[],
    generateAuthToken(): Promise<string>,
    comparePassword(password: string): Promise<boolean>
}

export interface UserModelInterface extends Model<User>{
    hashPassword(password: string): Promise<string>
}

const UserSchema: Schema<User> = new Schema({
    username:{
        type: String,
        required: [true, "What should we call you?!"],
    },
    email:{
        type: String,
        unique: true,
        required: [true, "Give us your identification"]
    },
    password:{
        type: String,
        required: [true, "Dont you want security"]
    },
    ppts:{
        type: [String]
    }
})

UserSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET!, {expiresIn: '24h'});
    return token
}

UserSchema.methods.comparePassword = async function(password:string) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.statics.hashPassword = async function(password: string){
    return await bcrypt.hash(password, 10)
}

const UserModel = mongoose.model<User, UserModelInterface>("user", UserSchema)
export default UserModel