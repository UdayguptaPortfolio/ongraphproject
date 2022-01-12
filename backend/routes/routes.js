const express=require('express');
const router=express.Router()
const signUpTempelateCopy=require('../models/Signupmodels')
const cityTempelateCopy=require('../models/citymodel')
const mostCityTempelateCopy=require('../models/mostSearchedCitymodel')


router.post('/signup',async(req,res)=>{
    try{
        const {email} = req.body;
        const oldUser = await signUpTempelateCopy.findOne({ email });
        if(oldUser){
            res.json({message:"You are already registered"})
        }
        else{
        const signedUpUser=new signUpTempelateCopy({
            UserName:req.body.UserName,
            email:req.body.email,
            Password:req.body.Password
        })
        signedUpUser.save()
        res.json({message:'You are Successfully Registered',user:true})
    }
    }
    catch(err){
        res.json({message:err})
    }
    
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
        res.json({message:"My response"})
        } catch (err) {
        console.log(err);
        }
})
router.post('/most',async(req,res)=>{
    const searcheditem= await mostCityTempelateCopy.findOne({cityname:req.body.cityname})
    console.log("My email->",req.body.email)
    if(searcheditem){
        console.log("Searched city exist")
        const searchedemail= await mostCityTempelateCopy.findOne({cityname:req.body.cityname,email:req.body.email})

        if(searchedemail)
        {
            console.log("Searched city with email id exist")
            res.json({message:"City and Email id Both exist",user:true})
        }
        else{
            console.log("Searched city exist without mail id and count increases",req.body.min_temp,req.body.max_temp)
            const mostSearch=await mostCityTempelateCopy.findOneAndUpdate({
                        cityname:req.body.cityname
                    },
                    {
                        $addToSet: {
                            email: req.body.email
                        },
                            count:searcheditem.count+1
                    })
                    mostSearch.save();
                    res.json({message:'Same City Added',user:true})
                }
        }
    else{
        console.log("I am adding New City Data",req.body.min_temp,req.body.max_temp)
        const mostSearch=await new mostCityTempelateCopy({
                cityname:req.body.cityname,
                    email:[req.body.email],
                count:1,
                min_temp:req.body.min_temp,
                max_temp:req.body.max_temp
            })
            mostSearch.save();
            res.json({message:"New City Added",user:true})
    }
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

router.get('/data',async(req,res)=>{
const mostSearchData = await mostCityTempelateCopy.aggregate([
        {
            $group: {
                _id: "$cityname",
                count: {
                    $max: "$count" 
                }
            }
        },
        {
            $sort: { 
                count: -1
            }
        },
        {
            $limit: 1
        }
    ]).then(result => {
        const mostSearchedcityName = result[0]._id;
        console.log(mostSearchedcityName)
        res.send(mostSearchedcityName)
    })
})

router.get('/min_temp',async(req,res)=>{
    const cityWithMinTemp = await mostCityTempelateCopy.aggregate([
            {
                $group: {
                    _id: "$cityname",
                    min_temp: {
                        $min: "$min_temp" 
                    }
                }
            },
            {
                $sort: { 
                    min_temp: 1
                }
            },
            {
                $limit: 1
            }
        ]).then(result => {
            const cityNameMinTemp = result[0]._id;
            console.log(cityNameMinTemp)
            res.send(cityNameMinTemp)
        })
    })

router.get('/max_temp',async(req,res)=>{
        const cityWithMaxTemp = await mostCityTempelateCopy.aggregate([
                {
                    $group: {
                        _id: "$cityname",
                        max_temp: {
                            $max: "$max_temp" 
                        }
                    }
                },
                {
                    $sort: { 
                        max_temp: -1
                    }
                },
                {
                    $limit: 1
                }
            ]).then(result => {
                const cityNameMaxTemp = result[0]._id;
                console.log(cityNameMaxTemp)
                res.send(cityNameMaxTemp)
            })
        })
        

module.exports=router