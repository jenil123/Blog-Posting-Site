const express=require('express')
const passport = require('passport')
const router=express.Router()


router.get('/google',passport.authenticate('google',{ scope: ['profile'] }))






router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log("success")
    res.redirect('/dashboard');
  });


  router.get('/logout',(req,res)=>{
      req.logout()
      res.redirect('/')
  })

module.exports=router