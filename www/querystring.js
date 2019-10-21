var express = require("express");
var querystring = require("querystring");
var router = express.Router();
router.get("/parse", function(req, res) {
  const obj1 = querystring.parse("name=sonoo&company=javatpoint");
  res.send(obj1);
});
router.get("/stringify", function(req, res) {
  const obj1 = querystring.stringify({ name: "dfsdf" });
  res.send(obj1);
});
module.exports = router;
