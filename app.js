const express=require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const morgan=require('morgan')
const exphbs=require('express-handlebars')
const methodOverride=require('method-override')
const path=require('path')
const passport = require('passport')
const session=require('express-session')
const MongoStore=require('connect-mongo')(session)



//mongoose.connect returns promise so use .then()
MONGO_URI='mongodb+srv://jenil:jenil@cluster0.uhlyr.mongodb.net/Innovative?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI,{useNewUrlParser:true},{useUnifiedTopology: true})
.then(()=>{
    console.log("connected to the database")
})
.catch(err=> console.log(err))
//load config file

dotenv.config({path:'./config/config.env'})

require('./config/passport')(passport)

app=express()

//body parser to get form data
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//method override for PUT and DELETE

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  }))

//logging
app.use(morgan('dev'))

const {formatDate,stripTags,truncate,editIcon,select}=require('./helper/hbs')

//handlebars
app.engine('.hbs', exphbs({helpers:{
    formatDate,
    stripTags,
    truncate,
    editIcon,
    select,

},  
defaultLayout:'main',extname: '.hbs'}));
app.set('view engine', '.hbs');

//session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store:new MongoStore({
        mongooseConnection:mongoose.connection
    })
  }))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())


//set global var
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
  })

//Static folder

app.use(express.static(path.join(__dirname,'public')))


//routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
app.use('/stories',require('./routes/stories'))


PORT=process.env.PORT || 3000
app.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname,'home.html'))
})
app.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname,'home.html'))
})
app.get('/offer', (req, res, next) => {
  res.send(["Write a blog","Delete a blog","Edit a blog"])
})

app.listen(PORT,()=>{
    console.log(`server running in PORT ${PORT}`)
})