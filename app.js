const express = require("express");
const app = express();
const port = 3005;

//Router가져오기
const productRouter = require("./routes/products.router.js");

//몽고DB연결
const connect = require("./schemas");
connect();

app.use(express.json());
app.use("/api", [productRouter]);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
