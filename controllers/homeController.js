var express = require('express'),
SHA256 = require('crypto-js/sha256'),
moment = require('moment');
var product = require('../repos/productRepo');

var router = express.Router();

router.get('/', (req, res) => {
    // var _new = product.getNew(10);
    // var _bestsell = product.getBestsell(10);
    // var _bestview = product.getBestview(10);
    
    var p1 =  product.getNew(10);    
    var p2 = product.getBestsell(10);
    var p3 = product.getBestview(10);

    Promise.all([p1,p2,p3]).then(([_new, _bestsell, _bestview])=>{
        var vm = {
            product_new:_new,
            product_bestsell: _bestsell,
            product_bestview: _bestview
        }
        res.render('home/index', vm);
    });
    
});
router.post('/', (req, res)=>{
    console.log(req.body.name);
    var dob = moment(req.body.dob, 'MM/DD/YYYY')
        .format('YYYY-MM-DDTHH:mm');
    var user = {
        username: req.body.username,
        password: SHA256(req.body.rawPWD).toString(),
        name: req.body.name,
        email: req.body.email,
        dob: dob,
        permission: 0
    };
    
    accountRepo.add(user).then(values =>{
        //res.render('account/register');
        var url = '/';
        if (req.query.retUrl) {
            url = req.query.retUrl;
        }
        res.redirect(url);
        console.log('ok');
    })
});


module.exports = router;