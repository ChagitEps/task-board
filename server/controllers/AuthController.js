const User=require("../models/User")
const bcrypt=require("bcrypt")
const jwt= require('jsonwebtoken')
const login=async(req,res)=>{
    const {email, password} = req.body
    if (!email || !password) 
        return res.status(400).json({message:'required field is missing'})
    const user=await User.findOne({email}).lean()
    if(user){
        const match = await bcrypt.compare(password,user.password)
        if(match){
            const userInfo= {_id:user._id,email:user.email}
            const token = jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
            return res.json({token:token})
        }
        else
            return res.status(401).json({message:"unauthorized"})
    }
    else
        res.status(401).json({message:"unauthorized"})
}
const register=async(req,res)=>{
    const {password,email} = req.body
    if (!email || !password) {
        return res.status(400).json({message:'required field is missing'})
        }
     const duplicate=await User.findOne({email}).lean()
       if(duplicate)
          return res.status(409).json({message:"duplicate email"})
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject= {password:hashedPwd,email}
    const user = await User.create(userObject)
    if(user){
       return res.status(201).json({success:true,
            message:`user ${user.email} created successfuly`,
            })
    }
    else
        return res.status(400).json({message:"failed"})
}
module.exports={login,register}