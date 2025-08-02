import mongoose from "mongoose";

const dbConnect = () =>{
    try{
        mongoose.connect(process.env.MONGODB_URI!)
        console.log(`Connected to db`)
    } catch(err){
        console.log("Couldnot connect to db", err);
    }
}

export default dbConnect