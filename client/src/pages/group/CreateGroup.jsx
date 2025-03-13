import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import cgroup from './Group.module.css'

function CreateGroup() {
    const [groupId, setGroupId] = useState("");
    const [groupname, setGroupname] = useState("");
    const userId = sessionStorage.getItem("userId");
    const navigate = useNavigate(); 

    const handleCreateGroup = async (event) => {
        event.preventDefault();  // Prevent page refresh

        try {
            const response = await axios.post("http://localhost:3000/api/auth/group/create", { 
                groupId, 
                userId, 
                groupname,
            });
            sessionStorage.setItem("groupId",groupId)
            navigate("/chat");  // Navigate after successful creation
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error creating group");
        }
    };

    return (
        <div className={cgroup.JoinGroup}>
            <form onSubmit={handleCreateGroup}>

                <h2>Create a Group</h2>
                <input 
                    type="text" 
                    placeholder="Enter 8-digit Group ID" 
                    value={groupId} 
                    onChange={(e) => setGroupId(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="Enter The Group Name" 
                    value={groupname} 
                    onChange={(e) => setGroupname(e.target.value)}
                />
                <button type="submit">Create Group</button>
            </form>
        </div>
    );
}

export default CreateGroup;
