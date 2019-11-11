const express = require("express");
const router = express.Router();

//주문 현황 불러오기 get
router.get("/", (req, res) =>{
    res.json({
        msg : "주문현황"
    })
});

//주문하기 post
router.post("/", (req, res) => {
    res.json({
        msg : "주문을 등록합니다."
    })
});
//주문수정 patch
router.patch("/", (req, res) => {
    res.json({
        msg : "주문을 수정합니다."
    })
});
//주문취소 delete
router.delete("/", (req, res) => {
    res.json({
        msg : "주문을 취소합니다."
    })
});


module.exports = router;