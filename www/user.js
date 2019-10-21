const express = require("express");
const router = express.Router();
// require("dotenv").config();
const environment = process.env.NODE_PORT;
router.use(express.json());
router.post("/registration", function(req, res) {
  res.send(req.body);
});
router.post("/login", function(req, res) {});
module.exports = router;
