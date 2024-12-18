import {Router} from "express";
import { login, signup, getUserInfo } from "../controller/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";


const authRoutes = Router();


authRoutes.post("/signup",signup);
authRoutes.post("/login",login);
authRoutes.get("/user-info",verifyToken,getUserInfo);


export default authRoutes;