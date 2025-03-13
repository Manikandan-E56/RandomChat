import Group from '../models/group.js';

const create = async (req, res) => {
    const { groupId, userId,groupname } = req.body;

    try {
        console.log("Received Data:", { groupId, userId,groupname });  // ✅ Log input values

        if (!groupId || !userId || !groupname) {
            console.log("Missing Data!");
            return res.status(400).json({ message: "Group ID and User ID are required" });
        }

        if (!/^\d{8}$/.test(groupId)) {  // ✅ Check if groupId is exactly 8 digits
            console.log("Invalid Group ID Format!");
            return res.status(400).json({ message: "Group ID must be exactly 8 digits" });
        }

        const existingGroup = await Group.findOne({ groupId });
        if (existingGroup) {
            console.log("Group ID already exists!");
            return res.status(400).json({ message: "Group ID already taken!" });
        }

        const newGroup = new Group({ groupId,groupname, createdBy: userId, members: [userId] });
        await newGroup.save();

        console.log("Group Created Successfully!", newGroup);

        res.status(201).json({ message: "Group created successfully", group: newGroup });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const joinGroup = async (req, res) => {
    const { groupId, userId , userName } = req.body;

    try {
        console.log("Joining Group:", { groupId, userId, userName});

        // Check if the group exists
        const group = await Group.findOne({ groupId });
        if (!group) {
            return res.status(404).json({ message: "Group not found!" });
        }

        // Check if the user is already in the group
        if (!group.members.includes(userId)) {
            group.members.push(userId);
        }else{
            console.log("You Have Already JOin  the group")
        }
        await group.save();

        res.status(200).json({ message: "Successfully joined the group!", group });
    } catch (error) {
        console.error("Join Group Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};



export { create,joinGroup };
