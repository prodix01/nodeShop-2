const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECERT);
        req.userData = decoded;
        next();
    }
    catch (error) {
        return res.status(404).json({
            msg : "인증에 실패하였습니다."
        });
    }

};
