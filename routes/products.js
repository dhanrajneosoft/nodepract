const controller = require("../controllers/products");
const authorize = require('../helpers/authorize')
const multer = require('multer');
const path = require('path');
const Role = require('../helpers/role');

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
const upload = multer({storage});
module.exports = router => {
  router.route("/products").post(authorize(Role.Admin),controller.add);
  router.route("/products").get(controller.get);
  router.route("/product/:id").delete(authorize(Role.Admin),controller.delete);
  router.route("/product/:id").put(authorize(Role.Admin),controller.update);
  router.route("/all-products").get(authorize(Role.Admin),controller.getProductDatails);
  router.route("/get-attr-match").get(controller.getMatchAgg);
  router.route("/product-image").post(upload.single('image'),controller.uploadProductImage);
  router.route("/product-image/:id").delete(controller.deleteProductImageByImageId);

};
