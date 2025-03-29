import { Course } from "../models/CoursesModel.js";
import { ValidateResource } from "./functions.js";
export const addCourse=async(req,res)=>{
    try{
        const{tittle,description,resources}=req.body;
        if(!tittle || !description || !resources){
            return res.json({message:"all fields are required"});
        }
        if(!ValidateResource(resources)){
            return res.json({message:"invalid resources"});
        }
        const isCourseExist=await Course.findOne({resources});
        if(isCourseExist){
            return res.json({message:"course already exist"});
        }
        const course=await Course.create({tittle,description,resources});
        await course.save();
        return res.json({message:"course added successfully"});
    }
    catch(error){
        console.log(error);
        return res.json({message:"server error"});
        
    }

};