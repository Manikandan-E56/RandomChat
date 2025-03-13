import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    groupId: { type: String, required: true, unique: true },  // ✅ Ensure it's a String
    groupname: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

const Group = mongoose.model("Group", groupSchema);
export default Group;
