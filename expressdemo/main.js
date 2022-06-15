var express = require('express')
var app = express()
var fs = require("fs"); 
app.use(express.static('public'))


app.set('view engine', 'hbs')
//Cho phep lay du lieu thu nguoi dung day len tu input
app.use(express.urlencoded({extended:true}))
app.get('/', function(req, res){
    let n = new Date()
    let name = "Minh Luu Thi"
    let studentFood = []
    fs.readFile("OpenUser.txt","utf-8",function(err,data){
        let data2 = data.trim().split('\n')
        for(i=0;i<data2.length;i++){
            let s = data2[i].split(";") // s[0]: ten s[1]:food
            let studentElement = {
                name: s[0],
                food:s[1]
            }
            studentFood.push(studentElement)
        }
        res.render('home',{'studentFood':studentFood})
    })
    //res.render('home',{'now':n,'name':name})
})
app.get('/index', function(req,res){
    let name = "Minh Luu Thi"
    let product = []
    fs.readFile("data.txt","utf-8",function(err,data){
        let data2 = data.trim().split('\n')
        for(i=0;i<data2.length;i++){
            let s = data2[i].split(";") // s[0]: ten s[1]:image
            if(s[1].trim().endsWith('.jpg') || s[1].trim().endsWith('.png')) {
            let studentElement = {
                name: s[0],
                product:s[1]
            } 
            
            product.push(studentElement)
        }
        }
        res.render('index',{'product':product})
    })
})


app.post('/registerLunch', function(req,res){
    //1.laays thong tin nguoi dung da nhap
    let name = req.body.txtName
    let foods = req.body.foods

    //2.Can ghi vao file
    //3/Hien thi dang ki thanh cong
    let userInfo = {
        'name' : name,
        'foods' : foods
    }
    res.render('thank', {'user': userInfo})


    // fs.appendFile("food.txt", name + ":" + foods + "\n", function(err) {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log("The file was saved!");
    // });

    //2.Cần ghi file
    fs.appendFile('food.txt',name + ';'+ foods + "\n",function(){
        console.log("da them moi: " + name + " ;" + foods)
    })
    // fs.appendFile('data.txt',name + ';'+ product + "\n",function(){
    //     console.log("da them moi: " + name + " ;" + product)
    // })
    //
    //
// Tự làm đọc ghi file

// fs.readFile('OpenUser.txt', function (err, data) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("Phuong thuc doc file khong dong bo: " + date.toString());
//  });
//  // Phuong thuc doc file dong bo
//  var data = fs.readFileSync('OpenUser.txt');
//  console.log("Phuong thuc doc file dong bo: " + data.toString());
//  console.log("Ket thuc chuong trinh.");
   
//     fs.writeFile("OpenUser.txt", name + ":" + foods + "\n", function (err) {
//     if (err) {
//         return console.log(err);
//     }
//     console.log("'Replaced!'");
//     });
})
   // fs.unlink('delete.txt',  function (err, data) {
    //     if (err) throw err;
       
    //     console.log('Delete file successfully');
    // });

app.get('/student', function(req, res){
    let foods = ['Com ', 'Bo ', 'Ga ', 'Mi tom']
    let food2 = []
    for(i = 0; i <foods.length; i++){
        // food2.push(foods[i].toUpperCase())
        foods[i] = foods[i].toUpperCase()
    }
    res.render('student', {'foods': foods})
    
})


const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("server is running")