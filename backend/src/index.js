const express = require('express') 
const mongoose = require('mongoose') 
const routes = require('./routes')
require('dotenv').config()

const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const DB = process.env.DB

const app = express() 
app.use(express.json())
app.use(routes)

mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0-erbaq.mongodb.net/${DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})

app.listen(3000, () =>{
    console.log('Application running') 
}) 

