const users = require("./users");
module.exports = router => {
  console.log(router);
  users(router);
  return router;
};
