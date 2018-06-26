var express = require('express');
var product = require('../repos/productRepo');

var router = express.Router();

router.get('/', (req, res) => {
    // var _new = product.getNew(10);
    // var _bestsell = product.getBestsell(10);
    // var _bestview = product.getBestview(10);
    var inew = [];
    var isell = [];
    var iview = [];
    product.getNew(10).then(_new =>{
        inew = _new;
    });
    
    product.getBestsell(10).then(_bestsell =>{
        isell=_bestsell;
    });
    product.getBestview(10).then(_bestview =>{
        iview=_bestview;
    })
    var vm={
        product_new:inew,
        product_bestsell: isell,
        product_bestview: iview
    };
    console.log(vm);
    //console.log(_new,"====", _bestsell, "====", _bestview);

    // var vm = {
    //     product_new:_new,
    //     product_bestsell: _bestsell,
    //     product_bestview: _bestview
    // }
    res.render('home/index', vm);
});


module.exports = router;