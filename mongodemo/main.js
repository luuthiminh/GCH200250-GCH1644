var express = require('express')
const { listen } = require('express/lib/application')
const res = require('express/lib/response')
var app = express()

app.get("/insert",(req, res)=>{
    res.render("newProduct")
})
app.set('view engine', 'hbs')
app.use(express.urlencoded({extended:true}))

app.post('/newProduct', async(req, res)=>{
    let name = req.body.txtName
    let price = req.body.txtPrice
    let picture = req.body.txtPicture
    let product= {
           'name' : name,
           'price' : price,
           'picture' : picture
    }
    //insert product vao database
})

app.get('/',(req, res)=>{
    res.render('home')
})
const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running')