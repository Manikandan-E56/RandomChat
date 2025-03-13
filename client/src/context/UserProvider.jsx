import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();
const url="http://localhost:3000";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
     
      try {
        const token = sessionStorage.getItem("token");
        if (!token) return;
  
        const response = await axios.get(`${url}/api/auth/user`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials:true,
        });
        setUser(sessionStorage.getItem('userName'));
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Re-authentication failed:", error);
         sessionStorage.removeItem("token");
      }};
  
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);