const users = require("./users");
const products = require("./products");
const orders = require('./orders');
const carts = require('./carts');
module.exports = router => {
  console.log(router);
  users(router);
  products(router);
  orders(router);
  carts(router);
  return router;
};
