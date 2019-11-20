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
                productInfo : docs.map(doc => {
                    return {
                        name : doc.name,
                        price : doc.price,
                        date : doc.createdAt,
                        req : {
                            type : "GET",
                            url : "http://localhost:1234/products/" + doc._id
                        }
                    }
                })
            })

        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

});



//상세제품 불러오기

router.get("/:product_id", (req, res) => {

    const id = req.params.product_id;
    productModel
        .findById(id)
        .exec()
        .then(doc => {
            if(doc) {
               return res.status(200).json({
                   msg : "성공적으로 제품을 불러왔습니다.",
                   productInfo : doc,
                   req : {
                       type : "GET",
                       url : "http://localhost:1234/products/"
                   }
               });
            }
            else {
                res.status(404).json({
                    msg : "제품이 없습니다.",
                    ref : {
                        type : "GET",
                        url : "http://localhost:1234/products/"
                    }
                });
            }
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
                createdProduct : {
                    name : result.name,
                    price : result.price,
                    date : result.createdAt,
                    req : {
                        type : "GET",
                        url : "http://localhost:1234/products/" + result._id
                    }
                }
            });
        })

        .catch(err => {
            res.status(500).json({
                errror : err.message
            });
        });

});










//제품 수정하기 patch
router.patch("/:product_id", (req, res) => {

    const id = req.params.product_id;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    productModel
        .update({ _id : id }, {$set : updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                msg : "성공적으로 제품을 수정했습니다.",
                updateInfo : {
                    req : {
                        type : "GET",
                        url : "http://localhost:1234/products/"
                    }
                }

            });
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

});





//제품 삭제하기 delete
router.delete("/:product_id", (req, res) => {

    const id = req.params.product_id;
    productModel
        .remove({ _id : id })
        .exec()
        .then(result => {
            res.status(200).json({
                msg : "성공적으로 제품정보를 삭제했습니다.",
                ref : {
                    type : "GET",
                    url : "http://localhost:1234/products"
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

});

module.exports = router;