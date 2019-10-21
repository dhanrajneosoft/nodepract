const express = require("express");
const fs = require("fs");
const router = express.Router();
router.get("/readFile", function(req, res) {
  console.log();
  fs.readFile("./mock/message.txt", function(error, data) {
    // console.log(error);
    console.log(data.toString());
  });
  res.send("Stopped");
});
module.exports = router;
