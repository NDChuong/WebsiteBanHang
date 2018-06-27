var db = require('../fn/db');
var config = require('../config/config');

exports.loadAll = () => {
    var sql = 'select * from brands';
    return db.load(sql);
}

exports.single = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from brands where BraID = ${id}`;
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
    var sql = `insert into brands(BraName) values('${c.BraName}')`;
    return db.save(sql);
}

exports.delete = (id) => {
    var sql = `delete from brands where BraID = ${id}`;
    return db.save(sql);
}

exports.update = (c) => {
    var sql = `update brands set BraName = '${c.BraName}' where CatID = ${c.BraId}`;
    return db.save(sql);
}