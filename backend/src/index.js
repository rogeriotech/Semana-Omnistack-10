const express = require('express') 
const mongoose = require('mongoose') 
const routes = require('./routes')
const cors = require('cors') 
require('dotenv').config()

const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const DB = process.env.DB

const app = express() 
app.use(cors())
app.use(express.json())
app.use(routes)

mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0-erbaq.mongodb.net/${DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})

app.listen(3333, () =>{
    console.log('Application running on port 3333') 
}) 

