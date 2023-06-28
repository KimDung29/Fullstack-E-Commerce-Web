import { Request, Response,  NextFunction } from "express";
import User from '../models/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import createError from "../utils/createError";

export const register = async (req:Request, res: Response, next:NextFunction) => {
    try {
        const userExists = await User.exists({ username: req.body.username })
        if (userExists) return next(createError(400, 'Username already exists!'))
        
        const emailExists = await User.exists({ email: req.body.email })
        if(emailExists) return next(createError(400, 'Email already exists!'))

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

        const token = jwt.sign(
            {
            id: user._id,
            isSeller: user.isSeller
            },
            process.env.JSON_KEY as string,
            { expiresIn: '10d'}
        )

        const refreshToken = jwt.sign({
            id: user._id,
            isSeller: user.isSeller
        }, process.env.JSON_KEY as string,  {
            expiresIn: '20d',
        })

        const { password, ...info } = user.toObject();
    //  httpOnly: true => allow to access token at Cookie through http request only, enhance secure
        res.cookie('accessToken', token, { httpOnly: true}).status(200).send(info)
        
    } catch (error) {
        next(error)
    }
}

export const refreshToken = async (req:Request, res: Response, next:NextFunction) => {
    try {
        const newAccessToken  = jwt.sign({
            id: req.body.userId, 
            isSeller: req.body.isSeller 
        }, process.env.JSON_KEY as string, {
            expiresIn: '60s', // Thời gian hết hạn của token
        });
            
        // Kiểm tra cookie accessToken để lấy mã token cũ
        const oldAccessToken = req.cookies.accessToken;
        
        if(oldAccessToken) {
            res.cookie('accessToken', newAccessToken , { httpOnly: true }).json({ accessToken: newAccessToken  });
        } else {
            // Trường hợp không có oldAccessToken, gửi phản hồi lỗi 
            next(createError(401, 'Unauthorized'));
        }
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

