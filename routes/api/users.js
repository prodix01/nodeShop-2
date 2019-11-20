const express = require("express");
const router = express.Router();
const userModel = require("../../models/users");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



//전체 유저정보 불러오기 get
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




// 회원가입 post
router.post("/register", (req, res) => {

    userModel
        //사용자 입력 이메
        .find({ email : req.body.email })
        .exec()
        .then(user => {
            //메일이 있을경우
            if (user.length >= 1) {
                return res.status(200).json({
                    msg : "이미 존재하는 이메일 입니다."
                });
            }
            else {
                //메일이 없을경우
                //패스워드 암호화
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                   if (err) {
                       return res.status(500).json({
                           error : err.message
                       });
                   }

                   //db에 저장
                    const user = new userModel({
                        email : req.body.email,
                        password : hash
                    });

                   user
                       .save()
                       .then(result => {
                           res.status(200).json({
                               msg : "회원가입을 완료했습니다.",
                               createdUser : result
                           })
                       })
                       .catch(err => {
                           res.status(500).json({
                               error : err.message
                           });
                       });
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });



});


// 로그인
router.post("/login", (req, res) => {

    userModel
        //이메일 매칭
        .find({ email : req.body.email})
        .exec()
        .then(user => {
            //이메일이 없을 경우
            if (user.length < 1) {
                return res.status(404).json({
                    msg : "이메일이 없습니다."
                });
            }
            else {
                //패스워드 매칭
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (result === false) {
                        return res.status(404).json({
                            msg : "비밀번호가 틀렸습니다."
                        });

                    }
                    else {
                        //토큰생성
                        const token = jwt.sign({
                           email : user[0].email,
                            userId : user[0]._id
                        },
                            process.env.JWT_SECERT, {expiresIn : "1h"});

                        res.status(200).json({
                            msg :  "성공적으로 로그인했습니다.",
                            tokenInfo : "bearer " + token
                        });
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