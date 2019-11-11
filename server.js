const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = 1234;

const usersRoutes = require("./routes/api/users");
const productsRoutes = require("./routes/api/products");
const orderRoutes = require("./routes/api/orders");

app.listen(port, console.log("서버 시작"));

const dbaddress = "mongodb+srv://prodix:aa1234@cluster0-nbev1.mongodb.net/test?retryWrites=true&w=majority" ;
mongoose.connect(dbaddress, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("몽고DB에 연결되었습니다."))
    .catch(err => console.log(err.message));


//라우터 아래에다가 bodyParser 를 사용할시 오류 발생 이유는?
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/orders", orderRoutes);

//왜 맨 아래로 넣으면 괜찮을까 ?
app.use((req, res) => {
    res.json({
        msg : "쇼핑몰에 오신것을 환영합니다."
    })
});

