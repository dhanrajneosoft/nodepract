const controller = require("../controllers/orders");

module.exports = router => {
  router.route("/order").post(controller.add);
  router.route("/order").get(controller.get);
};
