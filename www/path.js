const path = require("path");
const express = require("express");
const router = express.Router();
router.get("/list", (req, res) => {
  console.log(path.normalize("http://demo.com"));
});

module.exports = router;
