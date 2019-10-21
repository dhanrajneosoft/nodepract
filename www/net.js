var net = require("net");
var express = require("express");
var router = express.Router();
router.get("/server", function(req, res) {
  var server = net
    .createServer(socket => {
      socket.end("goodbye");
    })
    .on("error", err => {
      throw err;
    });

  server.listen(() => {
    address = server.address();
    console.log("opened server on %j", address);
  });
  res.end("ok");
});
module.exports = router;
