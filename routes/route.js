const express=require('express')
const User = require('../models/models.js')
const router=new express.Router()


router.get('/', async(req,res)=>{
   try{
       const user=await User.find({})
       res.status(201).send(user)
   }catch(error){
       res.status(400).send(error)
   }
})


router.post('/create', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send("User Successfully Saved!")
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/findByEmail', async (req, res) => {
    try {
        const user=await User.find({email:req.body.email})
        if(!user){
            return res.status(201).send('User Not Found')
        }
        return res.status(200).send(user)
    } catch (error) {
        return res.status(400).send(error)
    }
})

router.post('/findByPhone', async (req, res) => {
    try {
        const user=await User.find({phone:req.body.phone})
        if(!user){
            return res.status(201).send('User Not Found')
        }
        return res.status(200).send(user)
    } catch (error) {
        return res.status(400).send(error)
    }
})


router.patch('/update/:id',async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['email','phone']
    const isValidOpration=updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOpration){
        return res.status(400).send('Invalid updates!')
    }
    try{
        const id=req.params.id
        const user=await User.findById(id)
        updates.forEach((update)=>user[update]=req.body[update])
        await user.save();
        if(!user){
            res.status(404).send('User Not Found')
        }
        res.status(200).send("User Updated!")
    }catch(error){
        res.status(500).send(error)
    }
})


router.delete('/delete/:id',async(req,res)=>{
    try{
        const id=req.params.id
        const user= await User.findById(id)
        if(!user){
            return res.status(201).send('No user found')
        }
        User.findByIdAndDelete(id, () => {
            return res.status(200).send('User Deleted!')
        })
    }catch(error){
        return res.status(500).send(error)
    }
})


module.exports=router