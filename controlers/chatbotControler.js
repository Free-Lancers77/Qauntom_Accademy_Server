import { User } from "../models/usermodel.js";
// Correct import (must match exact filename with .js extension)
import { generateResponse } from '../services/geminiAiService.js';

export const chatWithAI = async (req, res) => {
  try {
    const { prompt, language, userId } = req.body;

    // Get AI response
    const aiResponse = await generateResponse(prompt, language);

    // Optional: Save to user's chat history
    await User.findByIdAndUpdate(userId, {
      $push: { chatHistory: { prompt, response: aiResponse, language } }
    });

    res.json({ reply: aiResponse });
  } catch (error) {
    res.status(500).json({ error: "Chat failed" });
  }
};
export const Debug=async(req,res)=>{
  try{
    const { prompt, language, userId } = req.body;
  }
  catch(error){
    console.log(error);
    return result.status(500).json({error:"server error"});
  }
}