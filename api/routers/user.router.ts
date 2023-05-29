import express from "express";
import { getUser,deleteUser } from "../controllers/user.controller";
import { verifyToken } from "../middleware/jwt";

const router = express.Router();
// this is how to test connect to mongodb and browser(localhost:500/api/users/test)
// router.get("/test", (req, res) => {
    // res.send('alo')
// });

router.get("/", getUser);

router.delete("/:id", verifyToken, deleteUser);

export default router;