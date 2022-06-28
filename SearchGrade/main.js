var express = require('express')
var app = express()

app.set('view engine', 'hbs')

app.use(express.urlencoded({extended:true}))

const { MongoClient } = require('mongodb')
var mongoClient = require('mongodb').MongoClient
var url = 'mongodb+srv://luuthiminh2028:Minh1234@cluster0.77xxnw3.mongodb.net/test'

// const mongoClient = require('mongodb').MongoClient;
// mongoClient.connect('mongodb+srv://luuthiminh2028:Minh1234@cluster0.77xxnw3.mongodb.net/test', function(err, db) {
//     if (err) throw err;
//     const col = db.collection('Grade')
//     col.aggregate([
//         {$lookup: {
//             from: 'Student',
//             localField: '_id',
//             foreignField: 'Student_id',
//             as: 'Student'
//         }}
//         ],function (err,res) {
//             if (err) throw err;
//             console.log(res);
//         });
// });

// db.GrateStudent.aggregate([
//     {
//     $lookup: {
//     from: "Student",
//     localField: "_id",
//     foreignField: "Student_id",
//     as: "Student"
//     },
//     }
// ])

app.get('/', async(req,res)=>{
       let server = await MongoClient.connect(url)
       //truy cap Database ATNToys
       let dbo = server.db("Grade")
       //insert Toy
       let students = await dbo.collection("Student").find().toArray()
       //quay lai trang home
    res.render('home',{'students':students})
})

app.post('/search',async (req,res)=>{
    let name = req.body.txtName
    //1. ket noi den server co dia chi trong url
    let server = await MongoClient.connect(url)
    //truy cap Database ATNToys
    let dbo = server.db("Grade")
    //get data
    let students = await dbo.collection("Student").find({'name': new RegExp(name,'i')}).toArray()
    res.render('home',{'students':students})
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('SERVER IS RUNNING')