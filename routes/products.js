const controller = require("../controllers/products");
module.exports = router => {
  router.route("/products").post(controller.add);
  router.route("/products").get(controller.get);
  router.route("/products/:id").delete(controller.delete);
  router.route("/products/:id").put(controller.update);
  router.route("/all-products").get(controller.getProductDatails);
  router.route("/get-attr-match").get(controller.getMatchAgg);
};
