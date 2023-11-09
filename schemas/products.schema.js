const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // 티켓번호
  ticketId : {
    type : Number,
    required : true,
    unique : true,
  }, 
  // 좌석명 
  seatName: {
    type: String,
    required: true,
  },
  // 좌석번호
  seatNumber: {
    type: Number,
    required: true,
  },
  // 팀명
  team: {
    type: String,
    required: true,
  },
  // 가격
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);