const express=require('express')
const mongoose=require('./db/db.js')
const userRouter=require('./routes/route.js')
var bodyParser = require('body-parser');
const cors=require("cors");

const app=express()
const port=process.env.PORT||3000

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true }))

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
app.use(cors(corsOptions))



app.use(express.json())
app.use(userRouter) 

app.listen(port,()=>{
    console.log('Server is up on the port '+port+" !")
})