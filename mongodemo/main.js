var express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const async = require('hbs/lib/async')
var app = express()

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended:true}))

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://127.0.0.1/27017'

app.get('viewAll', async (req, res)=>{
    let server = await MongoClient.connect(url)  
    let dbo = server.db("ATNToys")
    //find k mô tả ddk, lên lấy allproduct
    let products = await dbo.collection.apply('product').find().toArray()
    res.render('allProduct',{'product':products})
})


app.get('/', (req, res)=>{
    res.render('home')
})

app.get('/insert', (req, res)=>{
    res.render('newProduct')
})

app.post('/newProduct', async (req,res)=>{
    let name = req.body.txtName
    let price = req.body.txtPrice
    let picture = req.body.txtPicture
    let product = {
        'name' : name,
        'price' : price,
        'picture' : picture
    }
    //1. kết nối đến server có địa chỉ trong url
    let server = await MongoClient.connect(url) // await là đợi công việc này hoàn thành mới làm công việc tiếp theo. 
                                                //phải có async mới dùng được await 
    //2. truy cập database ATNToys
    let dbo = server.db("ATNToys")
    //insert product vao database
    await dbo.collection("product").insertOne(product)
    //quay lai trang Home
    res.redirect('/')
})

const POST = process.env.PORT || 3000
app.listen(POST)
console.log('Server is RUNNING!!!')