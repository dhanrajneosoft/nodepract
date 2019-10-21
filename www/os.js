var express = require("express");
var os = require("os");
var router = express.Router();
router.get("/os", function(res, res) {
  console.log("Architechture", os.arch());
  //   console.log("Contants", os.constants());
  console.log("CPUS", os.cpus());
  console.log("Endianess", os.endianness());
  console.log("Free Momory", os.freemem());
  console.log("Home Directory", os.homedir());
  console.log("Load Average", os.loadavg());
  console.log("Network Interfaces", os.networkInterfaces());
  console.log("Platform", os.platform());
  console.log("Temp Dir", os.tmpdir());
});
router.get("/raiseError", function(req, res) {
  try {
    throw new EvalError("Hello", "someFile.js", 10);
  } catch (e) {
    console.log(e instanceof EvalError); // true
    console.log(e.message); // "Hello"
    console.log(e.name); // "EvalError"
    console.log(e.fileName); // "someFile.js"
    console.log(e.lineNumber); // 10
    console.log(e.columnNumber); // 0
    console.log(e.stack); // "@Scratchpad/2:2:9\n"
  }
});
module.exports = router;
