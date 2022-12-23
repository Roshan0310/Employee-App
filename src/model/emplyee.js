const { default: mongoose } = require("mongoose");
let Mongoose = require("mongoose");

const emplyeeSchema = Mongoose.Schema(
    {
        name : String,
        position : String,
        location : String,
        salary : Number
    }
)

let employeeModel = Mongoose.model("emplyeeDetials",emplyeeSchema);

module.exports = {employeeModel}