var mysql = require('mysql');

//Export the functions
module.exports = {
    con: mysql.createConnection({
        host    : 'webitcloud.net',
        user    : 'webitclo_d11',
        password: 'a*9{[#w;4VTx',
        database: 'webitclo_d11'
    })
};