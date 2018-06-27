var express = require('express');
var product = require('../repos/productRepo');

var router = express.Router();

router.get('/', (req, res) => {
    // var _new = product.getNew(10);
    // var _bestsell = product.getBestsell(10);
    // var _bestview = product.getBestview(10);
    var vm= {};
    var p1 =  product.getNew(10);    
    var p2 = product.getBestsell(10);
    var p3 = product.getBestview(10);

    Promise.all([p1,p2,p3]).then(([_new, _bestsell, _bestview])=>{
        var vm = {
            product_new:_new,
            product_bestsell: _bestsell,
            product_bestview: _bestview
        }
        console.log(vm);
        res.render('home/index', vm);
    })
    
    //console.log(_new,"====", _bestsell, "====", _bestview);

    // var vm = {
    //     product_new:_new,
    //     product_bestsell: _bestsell,
    //     product_bestview: _bestview
    // }
    
});


module.exports = router;