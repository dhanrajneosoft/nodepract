const users = require("./users");
const products = require("./products");
module.exports = router => {
  console.log(router);
  users(router);
  products(router);
  return router;
};
