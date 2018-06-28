var product = require('../repos/productRepo');
var categoryRepo = require('../repos/categoryRepo');
var brandRepo = require('../repos/brandRepo');

module.exports = (req, res, next) =>{
    if(req.session.isLogged === undefined){
        req.session.isLogged = false;   
    }
    var Cate = categoryRepo.loadAll();
    var Brand = brandRepo.loadAll();    
    Promise.all([Cate,Brand]).then(([Crows,Brows])=>{                  
        res.locals.LayoutVM = {
            categories: Crows,
            brands:Brows,
            isLogged: req.session.isLogged,
            curUser: req.session.user
        }
        next();
    });

}