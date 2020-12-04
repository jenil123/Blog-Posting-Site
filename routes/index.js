const express=require('express')
const router=express.Router()
const {ensureAuth,ensureGuest}=require('../middleware/auth')
const Story=require('../models/story')
router.get('/',ensureGuest,(req,res)=>{
    res.render('login',{
        layout:'login'
    })
})


router.get('/dashboard',ensureAuth,async (req,res)=>{

    try{
        const story=await Story.find({user:req.user.id}).lean()//JSON object
        console.log("story")
        console.log(story)
        res.render('dashboard',{
            name:req.user.firstName,
            story
        })
    }
    catch(err){
        console.error(err)
        res.render('error/500')
    }



    
})


module.exports=router