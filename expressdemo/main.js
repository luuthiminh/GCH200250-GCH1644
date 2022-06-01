var express = require('express')
var app = express()

app.set('view engine', 'hbs')

app.get('/', function(req, res){
    let n = new Date()
    let name = "Minh Luu Thi"
    res.render('home', {'now': n, 'name' : name})
})

app.get('/student', function(req, res){

    res.render('student')
})

app.listen(5000)
console.log('Server is running')