import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/AuthRoutes.js';
import { authgroup } from './routes/AuthGroup.js';
import cookieParser from 'cookie-parser';
import {authuser} from './routes/user.js';
import {authmessage} from './routes/Authmessage.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const db = process.env.DATABASE_URL;

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/auth/group', authgroup);
app.use('/api/user', authuser);
app.use('/api/messages', authmessage);

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("DB Connection Error:", err.message));

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

