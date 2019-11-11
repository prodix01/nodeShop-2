const express = require("express");
const app = express();

const port = 1234;

const usersRoutes = require("./routes/api/users");
const productsRoutes = require("./routes/api/products");
const orderRoutes = require("./routes/api/orders");

app.listen(port, console.log("서버 시작"));



app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/orders", orderRoutes);

//왜 맨 아래로 넣으면 괜찮을까 ?
app.use((req, res) => {
    res.json({
        msg : "쇼핑몰에 오신것을 환영합니다."
    })
});

