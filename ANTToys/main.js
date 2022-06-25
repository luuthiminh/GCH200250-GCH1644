var express = require('express')
var session = require('express-session')

const { MongoClient } = require('mongodb')

var mongoClient = require('mongodb').MongoClient
var url = 'mongodb+srv://luuthiminh2028:Minh1234@cluster0.77xxnw3.mongodb.net/test'

var app = express()

app.set('view engine', 'hbs')

app.use(express.urlencoded({extended:true}))

// app.get('/viewAllToys',async (req,res)=>{
//     //1. ket noi den server co dia chi trong url
//     let server = await MongoClient.connect(url)
//     //truy cap Database ATNToys
//     let dbo = server.db("ATNToys")
//     //get data
//     let products = await dbo.collection('Toy').find().toArray()
//     res.render('view',{'toys':toys})
// })

app.post('/search',async (req,res)=>{
    let name = req.body.txtName

    //1. ket noi den server co dia chi trong url
    let server = await MongoClient.connect(url)
    //truy cap Database ATNToys
    let dbo = server.db("ATNToys")
    //get data
    let products = await dbo.collection('Toy').find({'name': new RegExp(name,'i')}).toArray()
    res.render('allProduct',{'toys':toys})
})

app.get('/', async(req,res)=>{
    // let name = req.body.txtName
    // let price = req.body.txtPrice
    // let description = req.body.txtDescription
    // let picture = req.body.txtPicture
    // let toys = {
    //     'name': name,
    //     'price': price,
    //     'description' : description,
    //     'picture': picture
    // }
       //1. ket noi den server co dia chi trong url
       let server = await MongoClient.connect(url)
       //truy cap Database ATNToys
       let dbo = server.db("ATNToys")
       //insert Toy
       let toy = await dbo.collection("Toy").find().toArray()
       //quay lai trang home
    res.render('home',{'toy':toy})
})

app.post('/create', async (req,res)=>{
    let name = req.body.txtName
    let price = req.body.txtPrice
    let description = req.body.txtDescription
    let picture = req.body.txtPicture
    let toys = {
        'name': name,
        'price': price,
        'description': description,
        'picture' : picture
    }
    //1. ket noi den server co dia chi trong url
    let server = await MongoClient.connect(url)
    //truy cap Database ATNToys
    let dbo = server.db("ATNToys")
    //insert Toy
    await dbo.collection("Toy").insertOne(toys)
    //quay lai trang home
    res.redirect('/')
})

//Gọi hàm lên gg, bên nav
app.get('/insert',(req,res)=>{
    res.render("create")
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('SERVER IS RUNNING')