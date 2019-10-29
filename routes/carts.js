const controller = require('../controllers/carts');
module.exports =  router => {
     router.route('/cart').post(controller.add);
     router.route('/cart').get(controller.get);
}