var db = require('../fn/db');
var config = require('../config/config');

exports.loadAll = () => {
    var sql = 'select * from products';
    return db.load(sql);
}

exports.loadAllByCat = (catId, offset) => {
    var sql = `select * from products where CatID = ${catId} limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}

exports.countByCat = catId => {
	var sql = `select count(*) as total from products where CatID = ${catId}`;
    return db.load(sql);
}

exports.single = proId => {
    var sql = `select * from products where ProID = ${proId}`;
    return db.load(sql);
}

exports.loadByBrand = (braId, offset) =>{
    var sql = `select * from products where BraID = ${braId} limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}

exports.countByBrand = braId => {
	var sql = `select count(*) as total from products where BraID = ${braId}`;
    return db.load(sql);
}

exports.getBestsell = (n)=>{
    var sql = `select * from products order by Sell limit ${n}`;
    return db.load(sql);
}
exports.getBestview = (n)=>{
    var sql = `select * from products order by Clicks limit ${n}`;
    return db.load(sql);
}
exports.getNew = (n)=>{
    var sql = `select * from products order by ProID DESC limit ${n}`;
    return db.load(sql);
}

exports.getCateAmount = (CatID) =>{
    var sql = `select count(*) from products where CatID = ${CatID}`;
    return db.load(sql);
}
exports.getBrand = (BraID)=>{
    var sql = `select * from products where BraID = ${BraID}`;
    return db.load(sql);
}
exports.getCate = (CatID)=>{
    var sql = `select * from products where CatID = ${CatID}`;
    return db.load(sql);
}