import User from "../models/Usermodels.js";
import jwt from "jsonwebtoken";

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_KEY, {
        expiresIn: "7d",
    });
};

// Signup Controller
const signup = async (req, res) => {
    try {
        const { email,name, password } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newUser = await User.create({ email,name, password });

        const token = createToken(newUser._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });

        return res.status(201).json({
            success:true,
            user: {
                id: newUser._id,
                email: newUser.email,
                name:newUser.name,
            },
            token
        });

    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Signin Controller
 const signin = async (req, res) => {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).json({ message: "Name and password are required" });
        }

        const user = await User.findOne({ name });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

       

        const token = createToken(user._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });

        return res.status(200).json({
           success:true,
            user: {
                id: user._id,
                name: user.name,
               
            },
            token,
        });
        

    } catch (error) {
        console.error("Signin Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export {signin,signup}