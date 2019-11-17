const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    id : {
        type : String,
        required : true
    },
    password : {
        type : {Number, String},
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});


module.exports = mongoose.model("user", userSchema);