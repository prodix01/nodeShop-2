const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        match : /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

},
    password : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});


module.exports = mongoose.model("user", userSchema);