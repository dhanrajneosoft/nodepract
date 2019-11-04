const Category = require('../models/categories');
module.exports = {
    add: (req, res) => {
        const category = new Category(req.body);
        category.save((err, result) => {
            if (!err && result) {
                res.send(result);
            } else {
                res.send(err);
            }
        })
    },
    get: (req, res) => {
         Category.find((err, result)=>{
             if(!err && result){
                 res.send(result);
             }else {
                 res.send(err);
             }
         })
    },
    update: (req, res) => {

    },
    delete: (req, res) => {

    }
}