import mongoose, {Document, Schema} from 'mongoose'

interface User extends Document{
    email: string,
    username: string,
    password: string,
    ppts: string[],
    premium: boolean,
}

const UserSchema: Schema<User> = new Schema({
    username:{
        type: String,
        required: [true, "Please give a name for us to call you"]
    },
    email:{
        type: String,
		required: [true, "Plase enter the email"],
		match: [/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/ , "Please use a valid email adress"]
    },
    password:{
        type: String,
        required: [true, "You dont want security?"]
    },
    ppts:{
        type: [String],
        default: [],
    },
    premium:{
        type: Boolean,
        default: false
    }
})

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", UserSchema)
export default UserModel;