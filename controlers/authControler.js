import { User } from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register=async(req,res)=>{
    //take the info from the body
    const {email,name,password}=req.body;
    //chech if they are empty
    if(!email || !name || !password){
        return res.status(404).json({error:"all fields are required"});
    }
    try{
        //chech if the user arleady ex  ists
            const finduser= await User.findOne({email});
            console.log(finduser);
            if(finduser){
                return res.status(404).json({error:"user already exists"});
            }
            //hash pass befor inserting it
            const hashed_pass=await bcrypt.hash(password,10);
                const user= await User.create({email,name,password:hashed_pass});
                await user.save();
                //generate the token when register
                const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
                res.cookie('token',token,{
                    httpOnly:true,
                    secure:process.env.NODE_ENV==="production",
                    sameSite:process.env.NODE_ENV=='production'?'none':'strict',
                    maxAge:7*24*60*60*1000




                })

            return res.status(200).json({message:"user created successfully"});
    }
    catch(error ){
        console.log(error);
        return res.status(500).json({error:"server error"});
    }

}
//work flow//
/*
The client sends a POST request to the /register endpoint with name, email, and password in the request body.

The server validates the input and checks if the user already exists.

If the user does not exist, the password is hashed, and a new user is created in the database.

A JWT token is generated and sent to the client as an HTTP-only cookie.

The server responds with a success message or an appropriate error message.*/
/////////////////////////////////////////////////////
//login function
export const login=async(req,res)=>{
 const {name,password}=req.body;
 if(!name || !password){
    return res.status(404).json({error:"all fields are required"});
 }
 try{
    const targetuser=await User.findOne({name});
    if(!targetuser){
        return res.status(404).json({message:'user not found'});
    }
    const matchpass=await bcrypt.compare(password,targetuser.password);
    if(!matchpass){
        return res.json({message:"wrong password"});
    }
    const token=jwt.sign({id:targetuser._id},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:process.env.NODE_ENV=='production'?'none':'strict',
        maxAge:7*24*60*60*1000




    })


    return res.status(200).json({message:"user logged in successfully"});

 }
 catch(error){
    console.log(error);
    return res.status(500).json({error:"server error"});
 }
}