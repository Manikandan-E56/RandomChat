import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    groupId: { type: String, required: true }, 
    sendername: { type: String, required: true },  
    text: { type: String, required: true },
    timestamp:{ 
        type: String, 
        default: () => new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
        })
    } 
});

export default mongoose.model("Message", messageSchema);
