var express = require('express')
var app = express()

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb+srv://luuthiminh2028:Minh1234@cluster0.77xxnw3.mongodb.net/test'

app.get('/viewAll',async (req,res)=>{
    //1. ket noi den server co dia chi trong url
    let server = await MongoClient.connect(url)
    //truy cap Database ATNToys
    let dbo = server.db("ATNToys")
    //get data
    let firstProduct = await dbo.collection('product').find().limit(1)
    let secondHafl = await dbo.collection('producr').find().skip(1).toArray()
    res.render('allProduct',{'first' : firstProduct, 'secondHafl' : secondHafl})
})

app.post('/search',async (req,res)=>{
    let name = req.body.txtName

    //1. ket noi den server co dia chi trong url
    //Dung await de ket noi mongo. K ket noi thi se k ket noi duoc voi ATNToy
    let server = await MongoClient.connect(url)
    //truy cap Database ATNToys
    let dbo = server.db("ATNToys")
    //get data
    let products = await dbo.collection('product').find({'name': new RegExp(name,'i')}).toArray()
    res.render('allProduct',{'products':products})
})

app.post('/search', async (req, res)=>{
    let name = req.body.txtName
    //1. kết nối đến server có địa chỉ trong url
    let server = await MongoClient.connect(url) // await là đợi công việc này hoàn thành mới làm công việc tiếp theo. 
                                                //phải có async mới dùng được await 
    //2. truy cập database ATNToys
    let dbo = server.db("ATNToys")
    let products = await dbo.collection('product').find({'name': new RegExp(name, 'i')}).toArray()
    res.render('allProduct',{'products':products})
})


app.post('/newProduct', async (req,res)=>{
    let name = req.body.txtName
    let price = req.body.txtPrice
    let picture = req.body.txtPicture
    if(name.length <= 5){
        res.render('newProduct', {'nameError' : 'Ten khong nho lon 5 ki tu!'})
        return
    }
    let product = {
        'name': name,
        'price': price,
        'picture': picture
    }
    //1. ket noi den server co dia chi trong url
    let server = await MongoClient.connect(url)
    //truy cap Database ATNToys
    let dbo = server.db("ATNToys")
    //insert product
    await dbo.collection("product").insertOne(product).toArray
    //quay lai trang home
    res.redirect('/')
})

app.get('/insert',(req,res)=>{
    res.render("newProduct")
})

app.get('/',(req,res)=>{
    res.render('home')
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running!')