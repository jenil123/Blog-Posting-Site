const express=require('express')
const router=express.Router()
const {ensureAuth}=require('../middleware/auth')
const Story=require('../models/story')



router.get('/add',ensureAuth,(req,res)=>{
    res.render('stories/add')
})

router.get('/',ensureAuth,async (req,res)=>{
    try {
        const story = await Story.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean()

        res.render('stories/index',{
            story
        })
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})
router.get('/:id',ensureAuth,async (req,res)=>{
    try {
        const story = await Story.findById( req.params.id)
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean()

        res.render('stories/show',{
            story
        })
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})

router.post('/',ensureAuth,async (req,res)=>{

    try {
        var f=0;
        
        req.body.user=req.user.id
        

        await Story.create(req.body)
        
  
        const exec = require('child_process').exec;

        const child = exec('node producer.js',
            (error, stdout, stderr) => {
                console.log(`stdout: ${stdout}`);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
        });
        const child1 = exec('node consumer.js',
            (error, stdout, stderr) => {
                console.log(`stdout: ${stdout}`);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
        });
        console.log(req.body)
        res.redirect('/dashboard')

    } catch (error) {
        console.error(error)
        res.send('error/500')
    }
})

router.get('/edit/:id',ensureAuth,async (req,res)=>{


    try {

        const story=await Story.findOne({_id:req.params.id}).lean()
    if(!story)
    {
        return res.render('error/404')
    }
    if(story.user!=req.user.id)
    {
        res.redirect('/stories')
    }
    else{
        res.render('stories/edit',{
            story
        })
    }
        
    } catch (error) {
        console.error(error)
        res.send('error/500')
    }
    
})


router.put('/:id',ensureAuth,async (req,res)=>{
    let story=await Story.findById(req.params.id).lean();
    if(!story)
    {
        return res.render('error/404')
    }
    if(story.user!=req.user.id)
    {
        res.redirect('/stories')
    }
    else{
        story=await Story.findOneAndUpdate({_id:req.params.id},req.body,{
            new:true,
            runValidators:true
        })
        res.redirect('/dashboard')
    }
})

//Delete Story
router.delete('/:id',ensureAuth,async(req,res)=>{
    try {

        await Story.remove({_id:req.params.id})
        res.redirect('/dashboard')


    } catch (error) {
        console.error(error)
        res.send('error/500')
    }
})


router.get('/user/:userId',ensureAuth,async(req,res)=>{
    try {

        const story=await Story.find({
            user:req.params.userId,
            status:'public'
        })
        .populate('user')
        .lean()

        res.render('stories/index',{
            story
        })
    } catch (error) {
        console.error(error)
        res.send('error/500')
    }
})


module.exports=router