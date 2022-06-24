import  express  from 'express'
import  path  from 'path'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './routes/user'
import feedRoute from './routes/feed'
import  cookies  from "cookie-parser"


import authentication from './middlewares/auth'
dotenv.config()
const app = express()

const url = `mongodb+srv://AubidaNaalwa:${process.env.MONGO_PASSWORD}@salary.mwtfp.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(url) 
.then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));


app.use(express.static(path.join(__dirname, 'build')));
app.use(cookies())
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/user', userRoute)
app.use(authentication)
app.use('/feed', feedRoute)
app.use(express.static(path.join(__dirname,'build')))

const port = 8080

app.listen((process.env.PORT || port), function () {
    console.log(`server runs on port : ${port}`)
})