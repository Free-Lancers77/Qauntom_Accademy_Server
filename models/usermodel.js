import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    isAdmin:{type:Boolean,default:false},
    verifyoption:{type:String,default:""},//used to store the token when sent on verfication of email
    verfyexpires:{type:Number,default:0},//set the expiry of token
    isVerfied:{type:Boolean,default:false},//set true when ujser is verfied
    resetopt:{type:String,default:""},//save the token for reset pass
    resetoptexpires:{type:Number,default:0},//set the expiry of token
});
export default mongoose.model("User",UserSchema);