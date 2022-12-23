// Task1: initiate app and run server at 3000
let express = require("express");
let Mongoose = require("mongoose");
let Bodyparser =require("body-parser");
let Cors = require("cors");
const path=require('path');
const {employeeModel} = require("./src/model/emplyee")
let app = new express();

app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 

Mongoose.connect("mongodb+srv://Roshan:Roshan5454@cluster0.dbtqtd9.mongodb.net/employeeDB?retryWrites=true&w=majority",
    { useNewUrlParser: true }

);

app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({extended:false}))
app.use(Cors());


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'

app.get("/api/employeelist",(req,res)=>{
    console.log("Started successfully");
    employeeModel.find((err,employee)=>{
        res.send(employee)
    })
});


//TODO: get single data from db  using api '/api/employeelist/:id'
app.get("/api/employeelist/:id",(req,res)=>{
    let id=req.params.id;
    employeeModel.findOne({_id:id},(err,employee)=>{
        res.send(employee)
    })
});




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post("/api/employeelist",async(req,res)=>{
    let data = {
        name : req.body.name,
        location :  req.body.location,
        position :  req.body.position,
        salary :  req.body.salary
    }

    let employee = new employeeModel(data);

    await employee.save(
        (err,data)=>{
            if(err){
                res.json({"Status":"Error","Error":err})
            }
            else{
                res.json({"Status":"Success","Data":data})
            }
        }
    );
    console.log(req.body)
});




//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete("/api/employeelist/:id",(req,res)=>{
    let data = req.body;
    id = req.params.id;
    employeeModel.findByIdAndDelete({"_id":id},data,(err,data)=>{
        if (err) {
            res.json({"Status":"Error","Error":err})
        } else {
            res.json({"Status":"deleted","Data":data})
            console.log("data deleted successfully");
        }
    });
});



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put("/api/employeelist",(req,res)=>{
    let data = {
        name : req.body.name,
        location :  req.body.location,
        position :  req.body.position,
        salary :  req.body.salary
    };
    let name = req.body.name;
    employeeModel.findOneAndUpdate({"name":name},data,(err,data)=>{
        if (err) {
            res.json({"Status":"Error","Error":err})
        } else {
            res.json({"Status":"Updated","Data":data})
            console.log("data updated successfully");
        }
    })
})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



app.listen(3000,()=>{
    console.log("Server has Started listening");
});



