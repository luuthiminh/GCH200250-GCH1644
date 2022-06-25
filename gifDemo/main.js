var express = require('express')
var session = require('express-session')

const { MongoClient } = require('mongodb')

var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://127.0.0.1:27017'

var app = express()

app.set('view engine', 'hbs')

app.use(express.urlencoded({extended:true}))


app.get('/',function(req,res){
    let id = req.body.txtId
    let name = req.body.txtName
    let email = req.body.txtEmail
    let username = req.body.txtUsername
    let password = req.body.txtPassword
    // let product = {
    //     'name': name,
    //     'price': price,
    //     'picture': picture
    // }
    res.render('admin/index')
})
// Category
app.get('/category',function(req,res){
    let name = req.body.txtName
    let description = req.body.txtDescription
    let category = {
        'name': name,
        'description' : description,
    }
    res.render('category/index')
})

app.post('/createCat', async (req,res)=>{
    let name = req.body.txtName
    let description = req.body.txtDescription
    let category = {
        'name': name,
        'description': description,
    }
    //1. ket noi den server co dia chi trong url
    let server = await MongoClient.connect(url)
    //truy cap Database ATNToys
    let dbo = server.db("ATNToys")
    //insert product
    await dbo.collection("Toy").insertOne(Toy)
    //quay lai trang home
    res.render('category/createCat',{'name':name, 'description':description})
})

//Gọi hàm lên gg, bên nav
app.get('/insertCat',(req,res)=>{
    res.render("category/createCat")
})


app.get('/Toy',function(req,res){
    let id = req.body.txtId
    let name = req.body.txtName
    let price = req.body.txtPrice
    let description = req.body.txtDescription
    let categoryName = req.body.txtCategoryName
    let picture = req.body.txtPicture
    let toy = {
        'id' : id,
        'name': name,
        'price': price,
        'description' : description,
        'categoryName' : categoryName,
        'picture': picture
    }
    res.render('Toy/index',{'id':id, 'name':name, 'price':price, 'description':description, 'categoryName': categoryName, 'picture':picture})
})

app.post('/createToy', async (req,res)=>{
    let id = req.body.txtId
    let name = req.body.txtName
    let price = req.body.txtPrice
    let description = req.body.txtDescription
    let picture = req.body.txtPicture
    let admin = {
        'id' : id,
        'name': name,
        'price': price,
        'description': description,
        'picture' : picture
    }
    //1. ket noi den server co dia chi trong url
    let server = await MongoClient.connect(url)
    //truy cap Database ATNToys
    let dbo = server.db("ATNToys")
    //insert product
    await dbo.collection("Toy").insertOne(Toy)
    //quay lai trang home
    res.render('Toy/createToy',{'id': id, 'name' : name, 'price':price, 'description':description,'picture': picture})
})

//Gọi hàm lên gg, bên nav
app.get('/insert',(req,res)=>{
    res.render("Toy/createToy")
})



const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('SERVER IS RUNNING')