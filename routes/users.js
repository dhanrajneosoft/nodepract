const controller = require("../controllers/users");
const auth = require("../middleware/auth")["validateToken"];
var multer  = require('multer')
const path = require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    console.log("file nam", file.originalname);
    console.log("file extension", path.extname(file.originalname));
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
 
var upload = multer({ storage: storage })
// var upload = multer({ dest: 'uploads'});

module.exports = router => {
  router.route("/register").post(controller.add);
  router.route("/users").get(auth, controller.get);
  router.route("/login").post(controller.login);
  router.route("/fileupload").post(upload.single('avtar'), controller.upload);
};
