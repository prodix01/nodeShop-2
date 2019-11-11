const express = require("express");
const router = express.Router();

//제품 불러오기 get
router.get("/", (req, res) =>{
    res.json({
        msg : "제품 불러옴"
    })
});

//제품 등록하기 post
router.post("/", (req, res) => {
    res.json({
        msg : "제품을 등록합니다."
    })
});
//제품 수정하기 patch
router.patch("/", (req, res) => {
    res.json({
        msg : "제품을 수정합니다."
    })
});
//제품 삭제하기 delete
router.delete("/", (req, res) => {
    res.json({
        msg : "제품을 삭제합니다."
    })
});

module.exports = router;