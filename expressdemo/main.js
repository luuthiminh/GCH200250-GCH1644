var express = require('express')
const res = require('express/lib/response')
const { redirect } = require('express/lib/response')
var app = express()

app.get('/', function(req, res){
    res.write('hello word')
    res.end()
})

app.get('/student', function(req, res){
    res.write('Student page')
    res.end()
})

app.listen(5000)
console.log('Server is running')