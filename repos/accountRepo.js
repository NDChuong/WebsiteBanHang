var db = require('../fn/db');

exports.add = user => {
    var sql = `insert into users(f_Username, f_Password, f_Name, f_Email, f_DOB, f_Permission) values('${user.username}', '${user.password}', '${user.name}', '${user.email}', '${user.dob}', ${user.permission})`;
    return db.save(sql);
}

exports.login = user => {
    var sql = `select * from users where f_Username = '${user.username}' and f_Password = '${user.password}'`;
    return db.load(sql);
}

exports.update = user => {
    var sql = `update users set f_Name = '${user.name}', f_Email = '${user.email}', f_DOB = '${user.dob}' where f_Name = '${user.name}'`;
    return db.load(sql);
}
exports.updateName = user => {
    var sql = `update users set f_Name = '${user.name}' where f_Name = '${user.name}'`;
    return db.load(sql);
}
exports.updateEmail = user => {
    var sql = `update users set f_Email = '${user.email}' where f_Name = '${user.name}'`;
    return db.load(sql);
}
exports.updateDOB = user => {
    var sql = `update users set  f_DOB = '${user.dob}' where f_Name = '${user.name}'`;
    return db.load(sql);
}

exports.loadAll = userID => {
    var sql = `select * from users where f_ID = '${userID}'`;
    return db.load(sql);
}