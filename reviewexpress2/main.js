var express = require('express')
var app = express()

app.use(express.urlencoded({extended:true}))
app.set('view engine', 'hbs')

app.get('/', function(req,res){
    let name = "Duong"
    res.render('index', {'name': name})
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("server is running")