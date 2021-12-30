const express=require('express');
const router=express.Router()
const signUpTempelateCopy=require('../models/Signupmodels')
const cityTempelateCopy=require('../models/citymodel')


router.post('/signup',async(req,res)=>{
    const {email} = req.body;
    const oldUser = await signUpTempelateCopy.findOne({ email });
    if(oldUser){
        res.json({message:"You are already registered"})
    }
    const signedUpUser=new signUpTempelateCopy({
        UserName:req.body.UserName,
        email:req.body.email,
        Password:req.body.Password
    })
    signedUpUser.save()
    .then(
        res.json({message:'You are Successfully Registered',user:true})
    ).catch(error=>{
        res.json(error)
    })
})
 
router.post('/city',async(req,res)=>{
    const city=await new cityTempelateCopy({
        cityname:req.body.cityname,
        email:req.body.email
    })
    city.save()
    .then(
        res.json({message:'City Name added Successfully'})
    ).catch(error=>{
        res.json({message:'City Name wrong'})
    })
})


router.post('/login',async (req,res)=>{
    const user = await signUpTempelateCopy.findOne({
        UserName:req.body.UserName,
        email:req.body.email,
        Password:req.body.Password
    })
    if(user){
        return res.json({status:'ok',user:true ,message:'Hi You are Logged In'})
    }
    else{
        return res.json({status:'error',user:false ,message:'Login Credentials are wrong'})
    }
})

module.exports=router