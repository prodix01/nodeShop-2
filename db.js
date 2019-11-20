const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex : true })
    .then(() => console.log("몽고DB에 연결되었습니다."))
    .catch(err => conso.log(err.message));