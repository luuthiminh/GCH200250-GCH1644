var express = require('express')
var session = require('express-session')

const { MongoClient } = require('mongodb')

var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://127.0.0.1:27017'

var app = express()

app.set('view engine', 'hbs')

app.use(express.urlencoded({extended:true}))

app.use(session({
    secret: 'sea2208',
    resave: false
}))

function isAuthenticated(req, res, next){
    let chuaDangNhap = !req.session.userName
    if(chuaDangNhap){
        res.redirect('/')

    }else{
        next()
    }
}
app.get('/',(req,res)=>{
    let accessCount = req.session.accessCount || 0  //lấy giá trị session ra bằng biến accessCount, nếu chưa có sẽ gán bằng 0
    accessCount++ //nếu có rồi thì sẽ tăng lên 1
    req.session.accessCount = accessCount //gán lại cho biến accessCount

    let chuaDangNhap = !req.session.userName //Check nếu name chưa có(dùng !)

    res.render('home', {'accessCount': accessCount, 'chuaDangNhap':chuaDangNhap})
})

app.get('/logout', (req, res) => {
    req.session.userName = null
    req.session.save((err) => {
        req.session.regenerate((err2) => {
            res.redirect('/')
        })
    })
})

app.post('/register', async(req, res, next)=>{
    let name = req.body.txtName
    req.session.userName = name
    // res.render('profile',{'name': req.session.userName})
    //kiem tra trong database

    let server = await MongoClient.connect(url)
    let dbo = server.db("ATNToys")
    let result = await dbo.collection("users").find({$and :[{'name':name}]}).toArray()
    if(result.length >0){
        // res.render('profile',{'name': req.session.userName})
        res.redirect('/profile')
    }else{
        res.write('khong hop le')
        res.end()
    }   
})



app.get('/profile', isAuthenticated, async (req, res)=>{
    
    let server = await MongoClient.connect(url)
    let dbo = server.db("ATNToys")
    let user = await dbo.collection("users").find({$and :[{'name':!req.session.userNAme}]}).limit(1).toArray()
        // res.render('profile',{'name': req.session.userName})
    console.log(user[0])
    res.render('profile', {'name': req.session.userName,"sId":req.session.id, 'user':user[0]})
})



const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('SERVER IS RUNNING')