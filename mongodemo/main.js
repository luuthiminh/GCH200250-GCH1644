var express = require('express')
const { listen } = require('express/lib/application')
const res = require('express/lib/response')
var app = express()
var MongoClient = require('mongodb').MongoClient
var url = "http://127.0.0.1/27017"

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
    //Kết nối đến server có địa chỉ url
    let server = await MongoClient.connect(url)
    //Truy cập đến Databay ATMToys
    let dbo = server.db("ATMToys")
    //insert product vao database
    //Đợi hoàn thành bằng sử dụng await
    await dbo.collections("product").insert(product)
    //Quay lại trang home
    res.redirect("/")
})

app.get('/',(req, res)=>{
    res.render('home')
})
const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running')