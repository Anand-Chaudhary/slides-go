import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import userRoutes from './routes/user.routes'
import aiRoutes from './routes/ai.routes'
import dbConnect from './db/db'
import cookie from 'cookie-parser'
import supabase from './services/supabase.service'
import pptRoutes from './routes/ppt.routes'
dotenv.config();

const app = express();
dbConnect()
console.log(supabase?.storage);

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}));


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookie())

app.use('/users', userRoutes)
app.use('/ai', aiRoutes)
app.use('/ppt', pptRoutes)

export default app