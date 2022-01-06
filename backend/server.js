const express=require('express')
const app=express()
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const routesUrls=require('./routes/routes')
const cors=require('cors')

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS,()=>console.log("Database Connected"))
app.get('/hello',function(req,res){
    res.send("Working");
})
app.use(express.json())
app.use(cors())
app.use('/app',routesUrls)

app.listen(process.env.PORT,()=>console.log("Server Running"))