const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.json({
        msg : "내 정보"
    })
});


module.exports = router;