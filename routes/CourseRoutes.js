import { addCourse, updateCourse } from "../controlers/CourseControler.js";
import express from "express";
const router=express.Router();
router.post("/addcourse",addCourse);
router.put('/updatecourse/:id',updateCourse);
export default router;