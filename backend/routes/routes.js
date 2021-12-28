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

module.exports=router