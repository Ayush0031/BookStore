import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const signup=async (req,res)=>{
      try {
       const {name,email,password}=req.body;
       const user= await User.findOne({email});
       const saltRounds=10;
       const hashedPassword =await bcrypt.hash(password,saltRounds);
       
       if(user){
        return res.status(400).json({message:"User already exists"})
       }
       const createdUser=new User({
        name:name,
        email:email,
        password:hashedPassword
       })
      await createdUser.save();
       res.status(201).json({message:"User created Successfully",user:{
                _id:createdUser._id,
                name:createdUser.name,
                email:createdUser.email
       }})
      } catch (error) {
        console.log("Error----------",error)
        res.status(500).json({message:"Internal server error"})
       
      }
        
}
export const login = async (req,res)=>{
    try {
        const{email,password}=req.body;
        const user= await User.findOne({email});
        const isPasswordMatched=await bcrypt.compare(password,user.password)
        if( !user || !isPasswordMatched){
            return  res.status(400).json({message:"Invalid Credentials"});
                
        }
        return  res.status(200).json({message:"Login Successfull",
            user:{
                _id:user._id,
                name:user.name,
            }})
    } catch (error) {
        console.log("error",error);
         res.status(500).json({message:"Internal server error"})
    }
}