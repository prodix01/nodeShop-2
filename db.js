const mongoose = require("mongoose");
const dbaddress = "mongodb+srv://prodix:aa1234@cluster0-nbev1.mongodb.net/test?retryWrites=true&w=majority" ;

mongoose.connect(dbaddress, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("몽고DB에 연결되었습니다."))
    .catch(err => console.log(err.message));