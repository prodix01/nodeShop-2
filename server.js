const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("./db");

const port = 1234;

const usersRoutes = require("./routes/api/users");
const productsRoutes = require("./routes/api/products");
const orderRoutes = require("./routes/api/orders");

app.listen(port, console.log(`http://localhost:${port}로 부터 서버를 시작합니다. `));




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

