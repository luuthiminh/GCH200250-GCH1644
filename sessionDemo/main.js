var express = require('express')
var session = require('express-session')
var app = express()

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'sea2208',
    resave: false
}))

app.get('/',(req,res)=>{
    let accessCount = req.session.accessCount || 0  //lấy giá trị session ra bằng biến accessCount, nếu chưa có sẽ gán bằng 0
    accessCount++ //nếu có rồi thì sẽ tăng lên 1
    req.session.accessCount = accessCount //gán lại cho biến accessCount
    let chuaDangNhap = !req.session.userName

    res.render('home', {'accessCount': accessCount, 'chuaDangNhap':chuaDangNhap})
})

app.post('/register', (req, res)=>{
    let name = req.body.txtName
    req.session.userName = name

    let chuaDangNhap = !req.session.userName
    res.render('profile', {'name': req.session.userName, 'chuaDangNhap':chuaDangNhap})
})

app.get('/profile', (req, res)=>{
    res.render('profile', {'name': req.session.userName})
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('SERVER IS RUNNING')