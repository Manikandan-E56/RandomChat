import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from "./context/UserProvider.jsx";
import Login from './pages/auth/Login';
import Home from './pages/Home/Home';
import CreateGroup from './pages/group/CreateGroup';
import JoinGroup from './pages/group/JoinGroup';
import Chat from './pages/chat/Chat';

import './App.css';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer />
         
        <div className="app">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/CreateGroup" element={<CreateGroup />} />
            <Route path="/JoinGroup" element={<JoinGroup />} />
            <Route path="/chat" element={<Chat />} />
         
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
