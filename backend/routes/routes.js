const express=require('express')
const router=express.Router()
const signUpTempelateCopy=require('../models/Signupmodels')


router.post('/signup',(req,res)=>{
    const signedUpUser=new signUpTempelateCopy({
        UserName:req.body.UserName,
        Password:req.body.Password
    })
    signedUpUser.save()
    .then(data=>{
        res.json(data)
    }).catch(error=>{
        res.json(error)
    })
})

router.post('/login',async (req,res)=>{
    const user = await signUpTempelateCopy.findOne({
        UserName:req.body.UserName,
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