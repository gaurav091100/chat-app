import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import sendResponse from "../utils/responseHandler.js";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email,userId) =>{
return jwt.sign({email,userId},process.env.JWT_KEY,{
    expiresIn: maxAge
})
}
export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password is required");
    }

    const user = await User.create({ email, password });

     res.cookie("jwt",createToken(email,user.id),{
        maxAge,
        secure: true,
        sameSite:"None"
     });
     return res.status(201).json({
        user:{
            id:user.id,
            email:user.email,
            profileSetup:user.profileSetup
        }
     })
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal Server Error");
  }
};


// Login 

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        if(!email || !password) {
            return res.status(400).send("Email and password is required");
        } 
        const user = await User.findOne({ email});
         
        if(!user){
            return res.status(404).send("User with this email does not exist");
        };

        const auth = await compare(password,user.password);

        if(!auth){
            return res.status(400).send("Invalid password");
        }

        res.cookie("jwt",createToken(email,user.id),{
            maxAge,
            secure: true,
            sameSite:"None"
         });
         return res.status(200).json({
            user:{
                id:user.id,
                email:user.email,
                profileSetup:user.profileSetup,
                firstName:user.firstName,
                lastName:user.lastName,
                image: user.image,
                color:user.color
            }
         })
    } catch (error) {
        console.log({ error });
        return res.status(500).send("Internal Server Error");

    }
}

export const getUserInfo = async (req, res) => {
    try {
      const user = await User.findById(req.userId);

      if(!user){
       return sendResponse(res, 404, false, "User with the given id not found");

        // return response.status(404).send("User with the given id not found");
      }
      return sendResponse(res, 200, true, "User retrieved successfully",{
            id:user.id,
            email:user.email,
            profileSetup:user.profileSetup,
            firstName:user.firstName,
            lastName:user.lastName,
            image: user.image,
            color:user.color
        });
    } catch (error) {
        console.log({ error });
        return sendResponse(res, 500, false, "Internal server error");

    }
}