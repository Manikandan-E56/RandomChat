import { Router } from "express";
import { create,joinGroup } from '../Controller/GroupController.js';


const authgroup = Router();
authgroup.post("/create", create);
authgroup.post("/join", joinGroup);
export { authgroup };
