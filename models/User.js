const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
     googleId:
     {
         type:String,
        required:true
     },
     displayName:
     {
         type:String,
        required:true
     },
     firstName:
     {
         type:String,
        required:true
     },
     lasName:
     {
         type:String,
        required:true
     },
     image:
     {
         type:String,
        //required:true
     },
     created:
     {
         type: Date,
         default:Date.now
     }

})

module.exports=mongoose.model('User',UserSchema)