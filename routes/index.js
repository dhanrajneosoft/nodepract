const users = require("./users");
const products = require("./products");
const orders = require('./orders');
module.exports = router => {
  console.log(router);
  users(router);
  products(router);
  orders(router);
  return router;
};
