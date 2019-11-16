const express = require("express");
const router = express.Router();
const productModel = require("../../models/products");



//제품 불러오기 get
router.get("/", (req, res) => {

    productModel
        .find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                msg : "성공적으로 제품 페이지를 불러왔습니다.",
                count : docs.length,
                productInfo : docs
            })

        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

});





//제품 등록하기 post
router.post("/", (req, res) => {

    const product = new productModel ({
       name : req.body.name,
       price : req.body.price
    });

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                msg : "성공적으로 제품을 등록했습니다.",
                createdProduct : result
            });
        })

        .catch(err => {
            res.status(500).json({
                errror : err.message
            });
        });

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