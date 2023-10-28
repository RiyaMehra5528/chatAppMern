const User = require("../modal/userModal")
const bcrypt=require('bcrypt')
import mongoose from 'mongoose'

exports.createUser=async(req,res)=>
{

    const {name,email,password,socketId,picture,isActive,isDeleted}=req.body
    try{

        const hashPass=bcrypt.hashSync(password,10)
           const user=await User.create({
            name: name,
                email:email,
                password:hashPass,
                socketId:socketId,
                picture:picture,
                isActive:false,
                isDeleted:false
            

           })
           return res.status(200).json({success:true,user:user})
    }
    catch(e)
    {
        console.log(e)
    }
}

exports.login=async(req,res)=>
{

    const {email,password}=req.body
    try{
        const user = await User.findOne({email:email})
    if(!user)
    {
        return res.status(404).json({success:false,msg:"NO SUCH USER"})
    }
    console.log("user", user)
   
    const match= await bcrypt.compareSync(password, user.password)
    if(!match)
    {
        return res.status(404).json({success:false,msg:"Invalid Credential"})
    }

    return res.status(200).json({success:true,msg:"Login Successfully",user:user})
    }
    catch(e)
    {
        console.log(e)
        return res.status(500).json({success:false})
    }
}

export const updateSocketId=async(userId,socketId)=>
{
    console.log(userId)
    console.log("fdsdsf",socketId)
    // console.log("before>>",user)
    
try{
    const user = await User.findByIdAndUpdate(userId, {
        socketId: socketId
    });
     console.log(">>",user)
}
catch(e)
{
    console.log(e)
}
}

export const getUserList=async(req,res)=>{

    try{
        const users=await User.find()
        return res.status(200).json({success:true,users:users})
    }
catch(e)
{
    console.log(e)
    return res.status(404).json({success:false})
}

}
export const getUserBySocketId=async(socketId)=>
{
try{

  const user=await User.findOne({socketId:socketId})
  console.log(user)
  return user._id
}
catch(e)
{
    console.log(e)
}
}