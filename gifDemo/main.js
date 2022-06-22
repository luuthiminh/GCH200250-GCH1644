var express = require('express')
var session = require('express-session')

const { MongoClient } = require('mongodb')

var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://127.0.0.1:27017'

var app = express()

app.set('view engine', 'hbs')

app.use(express.urlencoded({extended:true}))




const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('SERVER IS RUNNING')