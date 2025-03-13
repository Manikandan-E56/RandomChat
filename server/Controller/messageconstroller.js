import Message from '../models/message.js';

// Controller to send a message
export const send = async (req, res) => {
    const { groupId, sendername, text } = req.body;

    try {
        const newMessage = new Message({ groupId, sendername, text });
        await newMessage.save();

        res.status(201).json({ success: true, message: "Message sent", data: newMessage });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error sending message", error });
    }
};

// Controller to get messages by group ID
export const getMessagesByGroupId = async (req, res) => {
    try {
        const messages = await Message.find({ groupId: req.params.groupId }).sort({ timestamp: 1 });
        res.json({ success: true, messages });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error retrieving messages", error });
    }
};