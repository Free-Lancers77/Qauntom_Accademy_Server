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

export const updateCourse = async(req,res)=>{
    try{
        const {id} = req.params;
        const{tittle,description,resources}=req.body;
        if(!tittle || !description || !resources){
            return res.json({message:"all fields are required"});
        }
        if(!ValidateResource(resources)){
            return res.json({message:"invalid resources"});
        }
        const course=await Course.findById(id);
        console.log(course);
        if(!course){
            return res.json({message:"course not found"});
        }
        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            { 
                tittle, 
                description, 
                resources,
                updatedAt: Date.now() 
            },
            { new: true, runValidators: true } // Return updated doc + validate
        );
        return res.json({message:"course updated successfully"});
    }
    catch(error){
        console.log(error);
        return res.json({message:"server error"});
    }
}

export const deleteCourse = async(req,res)=>{
    try{
        const {id} = req.params;
        const course=await Course.findById(id);
        console.log(course);
        if(!course){
            return res.json({message:"course not found"});
        }
        const updatedCourse = await Course.deleteOne(course);
        return res.json({message:"course deleted successfully"});
    }
    catch(error){
        console.log(error);
        return res.json({message:"server error"});
    }
}