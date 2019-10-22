const controller = require("../controllers/users");
const auth = require("../middleware/auth")["validateToken"];

module.exports = router => {
  router.route("/register").post(controller.add);
  router.route("/users").get(auth, controller.get);
  router.route("/login").post(controller.login);
};
