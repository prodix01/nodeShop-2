const express = require("express");
const router = express.Router();

//내 정보 불러오기 get
router.get("/", (req, res) => {
    res.json({
        msg : "내 정보"
    })
});

//내 정보 등록하기 post
router.post("/", (req, res) => {
    res.json({
        msg : "나의 정보가 등록되었습니다."
    })
});

//내 정보 수정하기 patch or put
router.patch("/", (req, res) => {
    res.json({
        msg : "나의 정보를 수정합니다."
    })
});

//내 정보 삭제하기 delete
router.delete("/", (req, res) => {
    res.json({
        msg : "나의 정보를 삭제합니다."
    })
});


module.exports = router;