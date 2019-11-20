
const http = require("http");

const app = require("./app");



const server = http.createServer(app);
const port = process.env.PORT || 1235;



server.listen(port, console.log(`http://localhost:${port}로 부터 서버를 시작합니다. `));




app.use((req, res) => {
    res.json({
        msg : "쇼핑몰에 오신것을 환영합니다."
    })
});

