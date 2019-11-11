const express = require("express");
const app = express();

const port = 1234;

app.listen(port, console.log("서버 시작"));

app.use((req, res) => {
    res.json({
        msg : "서버에 오신것을 환영합니다."
    })
});