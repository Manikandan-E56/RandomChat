import User from "../models/Usermodels.js"; // Import User model


export const getUser = async (req, res) => {
    console.log("Request received:", req.user);
    try {
        
        const user = await User.findById(req.user.id).select("-password"); // Exclude password
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
