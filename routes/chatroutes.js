import {chatWithAI} from "../controlers/chatbotControler.js";
import { verfytoken } from "../middlware/cookiesfunction.js";

import express from "express";
const router=express.Router();
router.post("/chat",verfytoken,chatWithAI);
export default router;