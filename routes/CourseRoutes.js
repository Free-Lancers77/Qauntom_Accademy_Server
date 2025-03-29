import { addCourse } from "../controlers/CourseControler.js";
import express from "express";
const router=express.Router();
router.post("/addcourse",addCourse);
export default router;