const mysql = require('mysql')

module.exports.tests = mysql.createPool({
    connectionLimit: 10,
    user: 'remote',
    host: '137.74.95.140',
    port: 3306,
    password: 'Pcloud123!',
    database: 'rainbow_autotest',
    debug: false
});

module.exports.user = mysql.createPool({
    connectionLimit: 10,
    user: 'remote',
    host: '137.74.95.140',
    port: 3306,
    password: 'Pcloud123!',
    database: 'users_dashboard',
    debug: false
});  

