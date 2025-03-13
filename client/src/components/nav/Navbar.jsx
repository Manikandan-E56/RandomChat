import { useEffect, useState } from "react";
import { useUser } from '../../context/UserProvider.jsx';
import './Navbar.css'
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const { user } = useUser();

    const navigate =useNavigate();
    const logout = async()=>{
        sessionStorage.removeItem("userId")
        navigate('/')
    }

    return (
        <div className="navbar">
            <h1>Random Chat</h1>
            <nav>
            {user ? <p>Welcome  {user.name}</p> : <p></p>}
            <img onClick={logout} src="/logout.png" alt="logout" />
            </nav>

        </div>
        
    );
}