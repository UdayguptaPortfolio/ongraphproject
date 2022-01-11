const express=require('express');
const router=express.Router()
const signUpTempelateCopy=require('../models/Signupmodels')
const cityTempelateCopy=require('../models/citymodel')
const mostCityTempelateCopy=require('../models/mostSearchedCitymodel')
const City=require('../models/mostSearchedCitymodel')


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
        res.json({message:"My response"})
        } catch (err) {
        console.log(err);
        }
})
router.post('/most',async(req,res)=>{
    const searcheditem= await mostCityTempelateCopy.findOne({cityname:req.body.cityname})
    console.log(searcheditem)
    if(searcheditem){
        const searchedemail= await mostCityTempelateCopy.findOne({cityname:req.body.cityname,email:req.body.email})

        if(searchedemail)
        {
            res.json({message:"City and Email id Both exist",user:true})
        }
        else{
            const mostSearch=await mostCityTempelateCopy.findOneAndUpdate({
                        cityname:req.body.cityname
                    },{
                            count:searcheditem.count+1
                    })
                    mostSearch.save();
                    res.json({message:'Same City Added',user:true})
                }
        }
    else{
        const mostSearch=new mostCityTempelateCopy({
                cityname:req.body.cityname,
                email:req.body.email,
                count:1
            })
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
    // City.find({count: { $gt: 2 }},function(err,users){
    //     if(err) console.log(err)
    //     res.send(users.cityname)
    //     console.log(users.cityname)
    // })
    
const mostSearchData = await City.aggregate([
        {
            $group: {
                _id: "$cityname",
                total: {
                    $sum: 1 
                }
            }
        },
        {
            $sort: { 
                total: -1
            }
        },
        {
            $limit: 1
        }
    ]).then(result => {
        const mostSearchedcityName = result[0]._id;
        console.log(mostSearchedcityName)
        res.send(mostSearchedcityName)
        // res.json({
        //     status: 'success',
        //     data: result[0]
        // })
       
    })
})

module.exports=router

// const searcheditem= await mostCityTempelateCopy.findOne({cityname:req.body.cityname,email:req.body.email})
// console.log(searcheditem)
// if(searcheditem){
//     console.log("Hi I am present",searcheditem)
//     const mostSearch=await mostCityTempelateCopy.findOneAndUpdate({
//         cityname:req.body.cityname
//     },{
//             count:searcheditem.count+1
//     })
//     mostSearch.save();
//     res.json({message:'Same City Added',user:true,searcheditem:'hi'})
// }
// else{
// const mostSearch=new mostCityTempelateCopy({
//     cityname:req.body.cityname,
//     email:req.body.email,
//     count:1
// })