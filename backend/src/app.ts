import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import userRoutes from '../src/routes/user.routes'
import dbConnect from './db/db'
import cookie from 'cookie-parser'
dotenv.config();

const app = express();
dbConnect()

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookie())

app.use('/users', userRoutes)

export default app