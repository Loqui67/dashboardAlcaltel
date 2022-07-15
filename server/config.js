// config.js
const dotenv = require('dotenv');
const mysql = require('mysql')
dotenv.config();
module.exports = {
    port: process.env.PORT,
    jwtPassword: process.env.JWT_TOKEN_PASSWORD,
    sessionPassword: process.env.SESSION_PASSWORD,
    origin: process.env.ORIGIN,

    tests: mysql.createPool({
        connectionLimit: 10,
        user: process.env.DATABASE_USERNAME,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        password: process.env.AUTOTEST_DATABASE_PASSWORD,
        database: process.env.AUTOTEST_DATABASE_NAME,
        debug: false,
        dateStrings: true
    }),

    user: mysql.createPool({
        connectionLimit: 10,
        user: process.env.DATABASE_USERNAME,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        password: process.env.USER_DATABASE_PASSWORD,
        database: process.env.USER_DATABASE_NAME,
        debug: false
    })

};