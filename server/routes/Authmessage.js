import { Router } from "express";
import {send,getMessagesByGroupId} from "../Controller/messageconstroller.js"




const authmessage=Router();

authmessage.post("/send",send);
authmessage.get("/group/:groupId",getMessagesByGroupId);





export {authmessage};