import { Request, Response,  NextFunction } from "express";
import User from '../models/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import createError from "../utils/createError";

export const register = async (req:Request, res: Response, next:NextFunction) => {
    try {
        // make secret password for secure
        const hash = bcrypt.hashSync(req.body.password, 5)
        const newUser = new User(
         { ...req.body, password: hash}
        )
        // save to mongodb
        await newUser.save();
        // send res to client
        next(createError(200, 'User has been created.'))

    } catch (error) {
        next(error)
    }
}

export const login = async (req:Request, res: Response, next:NextFunction) => {
    try {
        // find username in db- username is unique so findOne is ok
        const user = await User.findOne({ username: req.body.username })
         
        if(!user) return next(createError(400, "User not found!"));
        // compare password in db and from req
        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!isCorrect) return next(createError(400, 'Wrong password or username!'))

        const token = jwt.sign({
            id: user._id,
            isSeller: user.isSeller
        }, process.env.JSON_KEY as string)

        const { password, ...info} = user.toObject();
        res.cookie('accessToken', token, { httpOnly: true}).status(200).send(info)
        
    } catch (error) {
        next(error)
    }
}
export const logout = async (req:Request, res: Response, next:NextFunction) => {
    res.clearCookie('accessToken', {
        sameSite: 'none',
        secure: true,
    }).status(200).send('User has been logged out.')
}