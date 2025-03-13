import  { Router } from "express";
import { getUser } from "../Controller/getUser.js"; // Import controller function
import authenticateToken from "../middleware/authmiddleware.js"; // Middleware for auth




const authuser=Router();

// Route to get logged-in user
authuser.get("/user", authenticateToken, getUser);

export {authuser};
