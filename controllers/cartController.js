var express = require('express');
var cartRepo = require('../repos/cartRepo'),
    productRepo = require('../repos/productRepo');

var router = express.Router();

router.get('/', (req, res) => {
    
    var arr_p = [];
    for (var i = 0; i < req.session.cart.length; i++) {
        var cartItem = req.session.cart[i];
        var p = productRepo.single(cartItem.ProId);
        arr_p.push(p);
        console.log(req.session.cart[i]);
    }
    
    var items = [];
    Promise.all(arr_p).then(result => {
        console.log('ok');
        
        for (var i = result.length - 1; i >= 0; i--) {
            var pro = result[i][0];
            console.log(pro);
            var item = {
                Product: pro,
                Quantity: req.session.cart[i].Quantity,
                Amount: pro.Price * req.session.cart[i].Quantity
            };
            items.push(item);
        }

        var vm = {
            items: items
        };
        console.log(vm);
        res.render('cart/index', vm);
    });
});

router.post('/add', (req, res) => {
    console.log('ok');
    var item = {
        ProId: req.body.proId,
        Quantity: +req.body.quantity
    };
    console.log(item);
    cartRepo.add(req.session.cart, item);
    res.redirect(req.headers.referer);
});

router.post('/remove', (req, res) => {
    cartRepo.remove(req.session.cart, req.body.ProId);
    res.redirect(req.headers.referer);
});

module.exports = router;