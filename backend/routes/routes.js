const express=require('express');
const router=express.Router()
const signUpTempelateCopy=require('../models/Signupmodels')
const cityTempelateCopy=require('../models/citymodel')
const mostCityTempelateCopy=require('../models/mostSearchedCitymodel')


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
router.post('/city',async (req,res)=>{
    try {
        const city=await cityTempelateCopy.findOneAndUpdate({
            email:req.body.email
        }, {
            $addToSet: {
                cityname: req.body.cityname
            }
        }, { upsert: true });
        } catch (err) {
        console.log(err);
        }
})
router.post('/most',(req,res)=>{
    const mostSearch=new mostCityTempelateCopy({
        cityname:req.body.cityname,
        count:req.body.count
    })
    mostSearch.save()
    .then(
        res.json({message:'You are Successfully Added City',user:true})
    ).catch(error=>{
        res.json(error)
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

// const{datapresent}=req.body.cityname
//     const{count}=req.body.count
//     const searcheditem= await mostCityTempelateCopy.findOne({datapresent})
//     if(searcheditem){
//         const mostSearch=new cityTempelateCopy({
//             cityname:req.body.cityname,
//             count:count+1
//         })
//     }
//     else{
//     const mostSearch=new mostCityTempelateCopy({
//         cityname:req.body.cityname,
//         count:1
//     })
//     mostSearch.save()
//     .then(
//         res.json({message:'You are Successfully Added City',user:true})
//     ).catch(error=>{
//         res.json(error)
//     })
// }