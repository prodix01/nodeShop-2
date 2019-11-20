const express = require("express");
const router = express.Router();
const userModel = require("../../models/users");



//내 정보 불러오기 get
router.get("/", (req, res) => {

    userModel
        .find()
        .exec()
        .then(result => {
            res.status(200).json({
                msg : "성공적으로 마이페이지를 불러왔습니다.",
                userInfo : result
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });
});




//내 정보 등록하기 post
router.post("/", (req, res) => {

    const user = new userModel({
        id : req.body.id,
        password : req.body.password
    });

    user
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                msg : "성공적으로 회원가입을 완료했습니다.",
                userInfo : result
            })
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

});





//내 정보 수정하기 patch or put
router.patch("/:user_id", (req, res) => {

    const id = req.params.user_id;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    userModel
        .update({ _id : id}, {$set : updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                msg : "성공적으로 유저 정보를 수정했습니다.",
                updateInfo : result
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

});





//내 정보 삭제하기 delete
router.delete("/:user_id", (req, res) => {

    const id = req.params.user_id;
    userModel
        .remove({ _id : id})
        .exec()
        .then(result => {
            res.status(200).json({
                msg : "성공적으로 유저 정보를 삭제했습니다."
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });
});


module.exports = router;