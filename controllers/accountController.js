var express = require('express'),
    SHA256 = require('crypto-js/sha256'),
    moment = require('moment');

var accountRepo = require('../repos/accountRepo');
var restrict = require('../middle-ware/restrict');

var router = express.Router();

router.post('/register', (req, res) => {
    console.log(req.body.name);
    var dob = moment(req.body.dob, 'D/M/YYYY')
        .format('YYYY-MM-DDTHH:mm');
    var user = {
        username: req.body.username,
        password: SHA256(req.body.rawPWD).toString(),
        name: req.body.name,
        email: req.body.email,
        dob: dob,
        permission: 0
    };
    console.log(user);
    accountRepo.add(user).then(values => {
        //res.render('account/register');
        var url = '/';
        if (req.query.retUrl) {
            url = req.query.retUrl;
        }
        res.redirect(url);
        console.log('ok');
    })
});


router.post('/login', function (req, res, next) {
    var user = {
        username: req.body.username,
        password: SHA256(req.body.rawPWD).toString()
    }

    accountRepo.login(user).then(rows => {
        if (rows.length > 0) {
            req.session.isLogged = true;
            req.session.user = rows[0];
            req.session.cart = [];

            var url = '/';
            if (req.query.retUrl) {
                url = req.query.retUrl;
            }
            res.redirect(url);
        }
        else {
            var vm = {
                showError: true,
                errorMsg: 'Login failed'
            };
            res.render('account/login', vm);
        }
    });
});
router.post('/logout', (req, res) => {
    req.session.isLogged = false;
    req.session.user = null;
    // req.session.cart = [];
    res.redirect(req.headers.referer);
});

router.post('/account-setting/:userID', (req, res) => {
    if (req.session.isLogged === true) {
        var dob = moment(req.body.dob, 'D/M/YYYY')
            .format('YYYY-MM-DDTHH:mm');
        
        var user = {
            name: req.body.name,
            email: req.body.email,
            dob: dob,
        };
        console.log(user);
        accountRepo.update(user).then(values => {
            var url = '/';
            if (req.query.retUrl) {
                url = req.query.retUrl;
            }
            res.redirect(url);
            console.log('ok');
        });
    }
    else{
        res.redirect('/');
    }
});
router.get('/account-setting/:userID',(req,res)=>{
    var IDUser = req.params.userID;
    accountRepo.loadAll(IDUser).then(rows=>{
        var vm = {
            user: rows
        }
        console.log(vm);
        res.render('account/account-setting', vm);
    });
    
})

module.exports = router;
