const express = require("express");
const router = express.Router();
const orderModel = require("../../models/orders");
const productModel = require("../../models/products");
const checkAuth = require("../../middleware/check_auth");

//주문 현황 불러오기 get
router.get("/", checkAuth, (req, res) => {

    orderModel
        .find()
        .populate("product", "name price")
        .exec()
        .then(docs => {
            res.status(200).json({
                msg : "성공적으로 주문페이지를 불러왔습니다.",
                count : docs.length,
                orderList : docs
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

});

//상세 장바구 제품 불러오기

router.get("/:order_id", (req, res) => {

    const id = req.params.order_id;
    orderModel
        .findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    msg: "성공적으로 상세제품정보를 불러옵니다.",
                    orderInfo : doc
                });
            }

            else {
                res.status(400).json({
                    msg : "주문정보가 없습니다."
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

});



//장바구니에 추가 post
router.post("/", (req, res) => {

    productModel
        .findById(req.body.productId)
        .then(product => {
            //제품 아이디 유무 확인
            if (!product) {
                return res.status(404).json({
                    msg : "제품아이디가 없습니다."
                });
            }

            else {
                const order = new orderModel ({
                    product : req.body.productId,
                    quantity : req.body.quantity
                });

                return order.save()

            }

        })
        .then(result => {
            res.status(200).json({
                msg : "장바구니 추가완료",
                orderInfo : result
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

});





//주문수정 patch
router.patch("/:order_id", (req, res) => {

    const id = req.params.order_id;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    orderModel
        .update({ _id : id}, {$set : updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                msg : "장바구니 주문 수량을 성공적으로 수정했습니다.",
                orderList : result
            })
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

});





//주문취소 delete
router.delete("/:order_id", (req, res) => {

    const id = req.params.order_id;
    orderModel
        .remove({ _id : id })
        .exec()
        .then(result => {
            res.status(200).json({
                msg : "장바구니에서 주문을 삭제했습니다."
            })
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

});


module.exports = router;