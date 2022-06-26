var express = require('express')
var session = require('express-session')

const ObjectId = require('mongodb').ObjectId;

const { MongoClient } = require('mongodb')

var mongoClient = require('mongodb').MongoClient
var url = 'mongodb+srv://luuthiminh2028:Minh1234@cluster0.77xxnw3.mongodb.net/test'

var app = express()

app.set('view engine', 'hbs')

app.use(express.urlencoded({extended:true}))

app.get('/', async(req,res)=>{
    let name = req.body.txtName
    let price = req.body.txtPrice
    let description = req.body.txtDescription
    let picture = req.body.txtPicture
    let toys = {
        'name': name,
        'price': price,
        'description' : description,
        'picture': picture
    }
       //1. ket noi den server co dia chi trong url
       let server = await MongoClient.connect(url)
       //truy cap Database ATNToys
       let dbo = server.db("ATNToys")
       //insert Toy
       let toy = await dbo.collection("Toy").find().toArray()
       //quay lai trang home
    res.render('home',{'toy':toy})
})
app.post('/search',async (req,res)=>{
    let name = req.body.txtName
    //1. ket noi den server co dia chi trong url
    let server = await MongoClient.connect(url)
    //truy cap Database ATNToys
    let dbo = server.db("ATNToys")
    //get data
    let toy = await dbo.collection("Toy").find({'name': new RegExp(name,'i')}).toArray()
    res.render('home',{'toy':toy})
})

app.get('/detail/:_id',async (req,res)=>{
    var id = req.params._id;
    var good_id = new ObjectId(id);

    //1. ket noi den server co dia chi trong url
    let server = await MongoClient.connect(url)
    //truy cap Database ATNToys
    let dbo = server.db("ATNToys")
    //get data
    let toys = await dbo.collection('Toy').find({ '_id': good_id}).toArray()
    res.render('detail',{'toys':toys})
})

app.get('/logout',(req,res)=>{
    req.session.userName = null
    req.session.save((err)=>{
        req.session.regenerate((err2)=>{
            res.redirect('/')
        })
    })
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
    let server = await MongoClient.connect(url)
    let dbo = server.db("ATNToys")
    await dbo.collection("Toy").insertOne(toys)
    res.redirect('/')
})

app.get('/insert',(req,res)=>{
    res.render("create")
})


app.get('/update/:_id', async (req, res) => {
    //transform your param into an ObjectId
    let id = req.params._id;
    let good_id = new ObjectId(id);
    //1. kết nối đến server có địa chỉ trong url
    let server = await MongoClient.connect(url) // await là đợi công việc này hoàn thành mới làm công việc tiếp theo. 
    //phải có async mới dùng được await 
    //2. truy cập database ATNToys
    let dbo = server.db("ATNToys")
    let toys = await dbo.collection('Toy').find({ '_id': good_id}).limit(1).toArray()
    res.render('edit', {'toys': toys[0]})
})

app.post('/edit/:_id', async (req, res) => {
    let name = req.body.txtName
    let price = req.body.txtPrice
    let description = req.body.txtDescription
    let picture = req.body.txtPicture

    //transform your param into an ObjectId
    var id = req.params._id;
    var good_id = new ObjectId(id);

    //1. kết nối đến server có địa chỉ trong url
    let server = await MongoClient.connect(url) // await là đợi công việc này hoàn thành mới làm công việc tiếp theo. 
    //phải có async mới dùng được await 
    //2. truy cập database ATNToys
    let dbo = server.db("ATNToys")
    let toys = await dbo.collection('Toy').updateOne({ '_id': good_id }, {$set:{'_id': good_id,'name': txtName, 'price': txtPrice, 'description': txtDescription, 'picture': txtPicture}})
    res.redirect('/')
})

app.get('/delete/:_id', async (req, res) => {
    //transform your param into an ObjectId
    var id = req.params._id;
    var good_id = new ObjectId(id);

    //1. kết nối đến server có địa chỉ trong url
    let server = await MongoClient.connect(url) // await là đợi công việc này hoàn thành mới làm công việc tiếp theo. 
    //phải có async mới dùng được await 
    //2. truy cập database ATNToys
    let dbo = server.db("ATNToys")
    await dbo.collection('Toy').deleteOne({'_id': good_id})
    res.redirect('/')
})




//Category
app.get('/category', async(req,res)=>{
    let cname = req.body.Cat_name
    let cdescription = req.body.Cat_description
    let categories = {
        'name': cname,
        'description' : cdescription
    }
       //1. ket noi den server co dia chi trong url
       let server = await MongoClient.connect(url)
       //truy cap Database ATNToys
       let dbo = server.db("ATNToys")
       //insert Toy
       let toy = await dbo.collection("Category").find().toArray()
       //quay lai trang home
    res.render('Category/index',{'categories':categories})
})

app.post('/createCat', async (req,res)=>{
    let cname = req.body.Cat_name
    let cdescription = req.body.Cat_description
    let categories = {
        'name': cname,
        'description': cdescription
    }
    //1. ket noi den server co dia chi trong url
    let server = await MongoClient.connect(url)
    //truy cap Database ATNToys
    let dbo = server.db("ATNToys")
    //insert Toy
    await dbo.collection("Category").insertOne(categories)
    //quay lai trang home
    res.redirect('/category')
})

//Gọi hàm lên gg, bên nav
app.get('/insertCat',(req,res)=>{
    res.render("Category/create")
})


const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('SERVER IS RUNNING')