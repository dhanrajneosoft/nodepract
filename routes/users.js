const controller = require("../controllers/users");
const auth = require("../middleware/auth")["validateToken"];
var multer  = require('multer')
var upload = multer({ dest: 'uploads'});

module.exports = router => {
  router.route("/register").post(controller.add);
  router.route("/users").get(auth, controller.get);
  router.route("/login").post(controller.login);
  router.route("/fileupload").post(controller.upload);
};
