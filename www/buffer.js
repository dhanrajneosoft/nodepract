const express = require("express");
const router = express.Router();
router.get("/init", function(req, res) {
  const buf = new Buffer.alloc(10, "dhanraj", "utf-8");
  console.log(buf);
  buf.fill(64);
  console.log(buf);
  console.log(buf.toString());
  res.end();
});

module.exports = router;
