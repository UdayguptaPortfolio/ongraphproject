const mongoose=require('mongoose');

const cityTempelate=new mongoose.Schema({
    cityname:{
        type:[String]
    },
    email:{
        type:String
    }
})
module.exports=mongoose.model('city_details',cityTempelate)
