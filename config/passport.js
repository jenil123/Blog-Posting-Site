const gstrat=require('passport-google-oauth20').Strategy

const mongoose=require('mongoose')

const User=require('../models/User')

module.exports=function(passport)
{
    passport.use(new gstrat({
        clientID:process.env.Google_client_id,
        clientSecret:process.env.google_client_secret,
        callbackURL:'/auth/google/callback'
    },async (accessToken,refreshToken,profile,done)=>{
        const newUser={
            googleId:profile.id,
            displayName:profile.displayName,
            firstName:profile.name.givenName,
            lasName:profile.name.familyName,
            image:profile.photos[0].value
        }
        //console.log(profile)
        try{
            let user=await User.findOne({googleId:profile.id})
            if(user)
            {
                console.log(user)
                done(null,user)
            }
            else{
                console.log("create ")
                console.log(user)
                user=await User.create(newUser)
                done(null,user)
            }
        }
        catch(err)
        {
              console.log(err)
        }

    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
      })
    
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
      })
}
