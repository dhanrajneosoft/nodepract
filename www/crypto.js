var crypto = require("crypto");
const express = require("express");
const router = express.Router();
const secret = "dhanraj";
router.get("/hmac", function(req, res) {
  const hash = crypto
    .createHmac("sha256", secret)
    .update("Welcome To")
    .digest("hex");
  res.send(hash);
});
router.get("/cipher", function(req, res) {
  const hash = crypto;
  var cipher = crypto.createCipher("aes192", secret);
  var encrypted = cipher.update("Hello JavaTpoint", "utf8", "hex");
  encrypted += cipher.final("hex");
  res.send(encrypted);
});
module.exports = router;
