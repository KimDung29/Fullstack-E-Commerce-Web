import express from "express";
import { getProduct, postProduct,getProducts, putProduct, deleteProduct  } from "../controllers/product.controller";
import { verifyToken } from "../middleware/jwt";

const router = express.Router();
// this is how to test connect to mongodb and browser(localhost:500/api/users/test)
// router.get("/test", (req, res) => {
//     res.send('alo')
// });

router.get("/single/:id", getProduct);
router.get("/",  getProducts);
router.post("", verifyToken, postProduct);
router.put("/:id", verifyToken, putProduct);
router.delete("/:id", verifyToken, deleteProduct);

export default router;