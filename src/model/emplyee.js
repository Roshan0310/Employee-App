const { default: mongoose } = require("mongoose");
let Mongoose = require("mongoose");

const employeeSchema = Mongoose.Schema(
    {
        name : String,
        position : String,
        location : String,
        salary : Number
    }
)

let employeeModel = Mongoose.model("emplyeeDetials",employeeSchema);

module.exports = {employeeModel}