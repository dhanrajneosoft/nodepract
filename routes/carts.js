const controller = require('../controllers/carts');
module.exports = router => {
    router.route('/cart').post(controller.add);
    router.route('/cart').get(controller.get);
    router.route('/updateQuantity/:item_id').put(controller.updateQuantity);
    router.route('/cart/:item_id').delete(controller.removeItemFromCart);
}