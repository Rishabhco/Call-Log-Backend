require('dotenv').config();
const mongoose=require('mongoose')

const db=process.env.URI;

mongoose.connect(db,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology: true,
    // useFindAndModify:false 
}).then(()=>{
    console.log("Connection Successful");
}).catch((err)=>{
    console.log(err);
    console.log("No connection");
})