const express = require("express");
const router = express.Router();

// post 생성(create)
const Product = require("../schemas/products.schema.js");
router.post("/ticket", async (req, res) => {
  const { ticketId, seatName, seatNumber, team, price } = req.body;

  if (!ticketId || !seatName || !seatNumber || !team || !price) {
    res.status(400).json({
      success: false,
      errorMessage: "정보를 모두 기입해주세요.",
    });
  } else {
    const existsProduct = await Product.findOne({ ticketId });
    if (existsProduct) {
      return res.status(400).json({
        success: false,
        errorMessage: "이미 등록된 입장권이 존재합니다.",
      });
    }
  }

  const createProduct = await Product.create({
    ticketId,
    seatName,
    seatNumber,
    team,
    price,
  });

  res.json({ Product: createProduct });
});

// get 읽기(read)
// 상품 목록 조회 API
router.get("/all", async (req, res) => {
  const products = await Product.find({});
  res.json({ products: products });
});

// 상품 상세 조회 API
router.get("/ticket/:ticketId", async (req, res) => {
  const ticketId = req.params.ticketId;
  const product = await Product.findOne({ ticketId });
  if (!product) {
    return res.status(404).json({ message: "등록된 입장권이 없습니다." });
  } else {
    return res.status(200).json({ data: product });
  }
});

// put 수정(update)
router.put("/update/:ticketId", async (req, res) => {
  const { ticketId, seatName, seatNumber, team, price } = req.body;
  const existsProduct = await Product.find({ ticketId });

  if (!ticketId || !seatName || !seatNumber || !team || !price) {
    res.status(400).json({ errorMessage: "정보를 모두 기입해주세요." });
  }
  if (existsProduct.length) {
    await Product.updateOne(
      { ticketId: ticketId },
      {
        $set: {
          seatName: seatName,
          seatNumber: seatNumber,
          team: team,
          price: price,
        },
      }
    );
    res.status(200).json({ message: "정보 수정 완료" });
  } else {
    return res.status(404).json({ message: "조회에 실패하였습니다." });
  }
});

// delete 삭제(delete)
router.delete("/delete/:ticketId", async (req, res) => {
  const { ticketId } = req.params;

  const existsProduct = await Product.find({ ticketId });
  if (existsProduct.length) {
    await Product.deleteOne({ ticketId });
  }

  res.json({ result: "등록 취소 완료" });
});

module.exports = router;
