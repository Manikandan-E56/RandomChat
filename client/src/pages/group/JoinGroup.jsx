import { useId, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import  gstyle from'./Group.module.css'
//import { useUser } from "../../context/UserProvider";


function JoinGroup() {
  const [groupId, setGroupId] = useState("");
  const userId = sessionStorage.getItem("userId");
  const userName=sessionStorage.getItem("userName");
     
  const navigate = useNavigate();

  const handleJoinGroup = async (event) => {
    event.preventDefault();

    if (!/^\d{8}$/.test(groupId)) {
      return toast.error("Group ID must be exactly 8 digits");
    }

    if (!userId) {
      toast.error("Please login first");
      return navigate("/");
    }

    try {
 
      const response = await axios.post("http://localhost:3000/api/auth/group/join", {
        groupId,
        userId,
        userName,
      });
     sessionStorage.setItem("groupId",groupId);
      navigate("/chat");
      toast.success(response.data.message);
    } catch (error) {
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while joining the group");
      }
    }
  };

  return (
    <div className={gstyle.JoinGroup}>
      <form onSubmit={handleJoinGroup}>
        <h2>Join a Group</h2>
        <input
          type="text"
          placeholder="Enter 8-digit Group ID"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          required
        />
        <button type="submit">Join Group</button>
      </form>
    </div>
  );
}

export default JoinGroup;