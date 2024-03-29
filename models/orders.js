const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
   product: {
       type : mongoose.Schema.Types.ObjectId,
       ref : "product",
       required : true
   },
    quantity : {
       type : Number,
       default : 1
    },
    createdAt : {
       type : Date,
       default : Date.now
    }
});


module.exports = mongoose.model("order", orderSchema);













