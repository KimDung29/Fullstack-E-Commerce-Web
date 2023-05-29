import { Response, NextFunction } from "express";
import User from "../models/user.model";
import { CustomRequest } from "../middleware/jwt";
import createError from "../utils/createError";


export const getUser = (req:CustomRequest, res:Response,) => {
    res.send('hello')
}
export const deleteUser = async (req:CustomRequest, res:Response, next: NextFunction) => {
  // id from req is: id
  // id in db is: _id
  const user = await User.findById(req.params.id)

  if(req.userId !== user?._id.toString()) next(createError(403, 'You can delete only your account'))
  
  await User.findByIdAndDelete(req.params.id)
  
  res.status(200).send('Deleted.')
}
