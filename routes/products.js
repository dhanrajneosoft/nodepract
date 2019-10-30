const controller = require("../controllers/products");
const authorize = require('../helpers/authorize')
const Role = require('../helpers/role');
module.exports = router => {
  router.route("/products").post(authorize(Role.Admin),controller.add);
  router.route("/products").get(controller.get);
  router.route("/products/:id").delete(authorize(Role.Admin),controller.delete);
  router.route("/products/:id").put(authorize(Role.Admin),controller.update);
  router.route("/all-products").get(authorize(Role.Admin),controller.getProductDatails);
  router.route("/get-attr-match").get(controller.getMatchAgg);
};
