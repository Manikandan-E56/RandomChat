import { Router } from "express";
import { signup, signin } from "../Controller/AuthController.js";


const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/signin", signin);

export default authRoutes;
