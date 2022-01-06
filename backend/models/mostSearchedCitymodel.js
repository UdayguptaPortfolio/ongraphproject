const mongoose=require('mongoose');

const mostCityTempelate=new mongoose.Schema({
    cityname:{
        type:String
    },
    count:{
        type:Number
    }
})
module.exports=mongoose.model('most_searched_city_details',mostCityTempelate)
