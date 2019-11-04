const controller = require('../controllers/categories')
module.exports = router => {
     router.route('/categories').post(controller.add);
     router.route('/categories').get(controller.get);
}