const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
    name:{
       type:String,
       required:true,
       trim:true
    },
    email:{
       type:String,
       unique:true,
       required:true,
       trim:true,
       lowercase:true,
       validate(value){
           if(!validator.isEmail(value)){
               throw new Error('Enter a valid email address')
           }
       }
    },
    phone:{
        type:Number,
        unique:true,
        required:true,
        trim:true,
        minLength:10,
        maxlength:11
    },
})

userSchema.statics.findByCredentials=async(email,phone)=>{
    const user=await User.findOne({email})

    if(!user){
        throw new Error('Invalid Email!')
    }

    const isMatch= await bcrypt.compare(phone,user.phone)

    if(!isMatch){
        throw new Error('Invalid Phone Number!')
    }
    return user
}


const User=mongoose.model('User',userSchema)
module.exports=User