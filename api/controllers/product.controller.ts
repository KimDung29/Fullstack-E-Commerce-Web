import { Response, NextFunction } from "express";
import Product from "../models/product.model";
import { CustomRequest } from "../middleware/jwt";
import createError from "../utils/createError";


export const getProduct = async (req:CustomRequest, res:Response, next: NextFunction ) => {
    try {
      const product = await Product.findById(req.params.id);
      if(!product) return next(createError(404, 'Not found product!'))
      res.status(200).send(product);
      
    } catch (error:any) {
      next(error)
    }
}


export const getProducts = async (req: CustomRequest, res: Response, next: NextFunction) => {
  
  try {
    if (req.body.isSeller) {
      const products = await Product.find();
      
      const productArray = products.filter(p => p.userId === req.body.userId)
      if (!productArray) return next(createError(404, 'Not found!'))
      res.status(200).send(productArray)
      
      
    }
    if (!req.body.isSeller) {
      const products = await Product.find();
      res.status(200).send(products);
    } 
    
  } catch (error) {
    const products = await Product.find().catch(error => {
      console.log(error);
      next(error);
    })
  };
}

export const postProduct = async (req:CustomRequest, res:Response, next: NextFunction) => {

  if(!req.isSeller) return next(createError(403, 'Only sellers can create a product!'))
  
  const newProduct = new Product ({
    userId: req.userId,
    ...req.body
  })
  try {    
      const productExists = await Product.exists({ title: req.body.title });
      if (productExists) {
        return next(createError(400, 'Product already exists!'));
      }
    
      const saveProduct = await newProduct.save(); 
      res.status(200).json(saveProduct)
    } catch (error:any) {
      next(error)
    }
}


export const putProduct = async (req:CustomRequest, res:Response, next: NextFunction) => {
    
  if(!req.isSeller) return next(createError(403, 'Only sellers can edit the product!'))
  try {
    const product = await Product.findByIdAndUpdate(req.params.id);

    if (!product) return next(createError(404, 'Not found!'))

    product.userId = req.body.userId
    product.title = req.body.title
    product.desc = req.body.desc
    product.totalStars = req.body.totalStars
    product.starNumber = req.body.starNumber
    product.categories = req.body.categories
    product.brand = req.body.brand
    product.price = req.body.price
    product.coverImg = req.body.coverImg
    product.features = req.body.features
    product.longDesc = req.body.longDesc
    product.discount = req.body.discount
    product.inStock = req.body.inStock

    await product.save();
    res.status(200).send('Edited successfully.')
    
  } catch (error: any) {
    next(error)
  }
}

export const deleteProduct = async (req:CustomRequest, res:Response, next: NextFunction) => {
  if(!req.isSeller) return next(createError(403, 'Only seller can delete product'))

  try {
    const product = await Product.findById(req.params.id)
    if(product?.userId !== req.userId) return next(createError(403, 'You can delete only your product!'))
    
    await Product.findByIdAndDelete(req.params.id)
   
    res.status(200).send('Product has been deleted!')
  } catch (error: any) {
    next(error)
  }
}


