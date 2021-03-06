var db = require('../fn/db');
var config = require('../config/config');

exports.loadAll = () => {
    var sql = 'select * from categories';
    return db.load(sql);
}

exports.single = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from categories where CatID = ${id}`;
        db.load(sql).then(rows => {
            if (rows.length === 0) {
                resolve(null);
            } else {
                resolve(rows[0]);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

exports.add = (c) => {
    var sql = `insert into categories(CatName) values('${c.CatName}')`;
    return db.save(sql);
}

exports.delete = (id) => {
    var sql = `delete from categories where CatID = ${id}`;
    return db.save(sql);
}

exports.update = (c) => {
    var sql = `update categories set CatName = '${c.CatName}' where CatID = ${c.CatId}`;
    return db.save(sql);
}