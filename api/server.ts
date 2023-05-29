import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import authRoute from './routers/auth.router'
import userRoute from './routers/user.router'
import productRoute from './routers/product.router'
import cookieParser from 'cookie-parser'
import {Request, Response, NextFunction } from 'express';
import cors from 'cors'

const app = express();
// to use env
dotenv.config();
// allow to received input value form client
app.use(express.json())
// to use cookie in client side
app.use(cookieParser())
// to use backend and frontend from 2 different domain
app.use(cors({ origin:"http://localhost:5173", credentials: true}))


app.use('/api/auth', authRoute )
app.use("/api/users", userRoute )
app.use("/api/products", productRoute )

app.use((err:any, req:Request, res:Response, next: NextFunction) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong!';

    return res.status(errorStatus).send(errorMessage)
})

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO as string ) // make sure add dotenv
        console.log("Connect to MongoDB!")
    } catch (error) {
        console.log(error)
    }
}

app.listen(5000, () => {
    connect()
    console.log('Backend server is running!')
})
