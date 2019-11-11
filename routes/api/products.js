const express = require("express");
const router = express.Router();


router.get("/", (req, res) =>{
    res.json({
        msg : "제품 불러옴"
    })
});


module.exports = router;