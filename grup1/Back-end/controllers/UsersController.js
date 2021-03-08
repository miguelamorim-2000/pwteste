//definition of constants
const saltRounds = 10;
const connect = require('../config/connect');
const bCrypt = require('bcrypt-nodejs');


//function that return the result of callback
function read(req, res) {
    //create and execute the read query in the database
    connect.con.query('SELECT * from users order by id desc', function (err, rows, fields) {
        if (!err) {
            //checks the results, if the number of rows is 0 returns data not found, otherwise sends the results (rows).
            if (rows.length == 0) {
                res.status(404).send("Data not found");
            } else {
            res.status(200).send(rows);
        }
    } else
    console.log('Error while performing Query.', err);
    });
}

//function that returns the result of an id
function readID(req, res) {
    //create and execute the read query in the database
    const id = req.sanitize('id').escape();                                                                                                                                        
    connect.con.query('SELECT * from users where id = ?', id, function (err, rows, fields) {
        if (!err) {
            //checks the results, if the number of rows is 0 returns data not found, otherwise sends the results (rows).
            if (rows.length == 0) {
                res.status(404).send({
                    "msg": "data not found"
                });
            } else {
                res.status(200).send(rows);
            }
        } else
        res.status(400).send({
            "msg": err.code
        });
    });
}


//function that insert 3 parameters
function save(req, res) {
    //receive form data sent by post
    const email = req.sanitize('email').escape();
    const password = req.sanitize('password').escape();
    const tipo = req.sanitize('tipo').escape();
    var query = "";
        var post = {
            email: email,
            password: password,
            tipo: tipo
        };
        query = connect.con.query('INSERT INTO users SET ?', post, function (err, rows, fields) {
            console.log(query.sql);
            if (!err) {
                res.status(200).location(rows.insertId).send({
                "msg": "inserted with success"
            });
            console.log("Number of records inserted: " + rows.affectedRows);
        } else {
            if (err.code == "ER_DUP_ENTRY") {
                res.status(409).send({"msg": err.code});
                console.log('Error while performing Query.', err);
            } else res.status(400).send({"msg": err.code});
        }
    });
}

//function that updates all the data of an id
function update(req, res) {
    //receive form data sent by post
    const email = req.sanitize('email').escape();
    const password = req.sanitize('password').escape();
    const tipo = req.sanitize('tipo').escape();
    console.log("without hahsh:" + req.body.pass);
    var query = "";
    var update = {
        email,
        password,
        tipo
    };
    query = connect.con.query('UPDATE users SET email = ?, password = ?, tipo = ? where id = ?', update, function (err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records updated: " + rows.affectedRows);
            res.status(200).send({"msg": "update with success"});
        } else {
            res.status(400).send({"msg": err.code});
            console.log('Error while performing Query.', err);
        }
    });
}

//function that update a user's password
function updatePassword(req, res) {
    //receive form data sent by post
    const email = req.sanitize('email').escape();
    const password = req.sanitize('password').escape();
    console.log("without hahsh:" + req.body.pass);
    var query = "";
    query = connect.con.query('UPDATE users SET password = ? where email = ?', [password, email], function (err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records updated: " + rows.affectedRows);
            res.status(200).send({"msg": "update with success"});
        } else {
            res.status(400).send({"msg": err.code});
            console.log('Error while performing Query.', err);
        }
    });
}

//function that update a user's status
function updateStatus(req, res) {
    //receive form data sent by post
    const id = req.sanitize('id').escape();
    const status = req.sanitize('status').escape();
    console.log("without hahsh:" + req.body.pass);
    var query = "";
    query = connect.con.query('UPDATE users SET status = ? where id = ?', [status, id], function (err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records updated: " + rows.affectedRows);
            res.status(200).send({"msg": "update with success"});
        } else {
            res.status(400).send({"msg": err.code});
            console.log('Error while performing Query.', err);
        }
    });
}


//function that delete all the data of an id
function deleteID(req, res) {
    //create and execute the read query in the database
    const id = req.sanitize('id').escape();
    connect.con.query('DELETE from users where id = ?', id, function (err, rows, fields) {
        if (!err) {
            //checks the results, if the number of rows is 0 returns data not found, otherwise sends the results (rows).
            if (rows.length == 0) {
                res.status(404).send({
                    "msg": "data not found"
                });
            } else {
                res.status(200).send({
                    "msg": "success"
                });
            }
        } else
        console.log('Error while performing Query.', err);
    });
}


//function that returns users with a certain email
function readEmail(req, res) {
    //create and execute the read query in the database
    const email = req.sanitize('email').escape();                                                                                                                                        
    connect.con.query('SELECT id from users where email = ?', email, function (err, rows, fields) {
        if (!err) {
            //checks the results, if the number of rows is 0 returns data not found, otherwise sends the results (rows).
            if (rows.length == 0) {
                res.status(404).send({
                    "msg": "data not found"
                });
            } else {
                res.status(200).send(rows);
            }
        } else
        res.status(400).send({
            "msg": err.code
        });
    });
}

//function that returns users with a certain type(unregisted)
function readUnregisted(req, res) {
    //create and execute the read query in the database
    const type = "unregisted";
    connect.con.query('SELECT id from users where tipo = ?', type, function (err, rows, fields) {
        if (!err) {
            //checks the results, if the number of rows is 0 returns data not found, otherwise sends the results (rows).
            if (rows.length == 0) {
                res.status(404).send({
                    "msg": "data not found"
                });
            } else {
                res.status(200).send(rows);
            }
        } else
        res.status(400).send({
            "msg": err.code
        });
    });
}

//function that returns users with a certain type(anonimo)
function readAnonymous(req, res) {
    //create and execute the read query in the database
    const tipo = "anonimo";
    connect.con.query('SELECT id from users where tipo = ?', tipo, function (err, rows, fields) {
        if (!err) {
            //checks the results, if the number of rows is 0 returns data not found, otherwise sends the results (rows).
            if (rows.length == 0) {
                res.status(404).send({
                    "msg": "data not found"
                });
            } else {
                res.status(200).send(rows);
            }
        } else
        res.status(400).send({
            "msg": err.code
        });
    });
}

//function that update a user's password
function updatePassword2(req, res) {
    const email = req.sanitize('email').escape();
    const password = req.sanitize('password').escape();

    var generateHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };
      const userPassword = generateHash(password);
    var query = "";
    query = connect.con.query('UPDATE users SET password = ? WHERE email= ?', [userPassword, email], function (err, rows, fields) {
        if (!err) {
            console.log("Number of records updated: " + rows.affectedRows);
            res.status(200).send({"msg": "update with success"});
        } else {
            res.status(400).send({"msg": err.code});
            console.log('Error while performing Query.', err);
        }
    });
}



//Export the functions
module.exports = {
    read: read,
    readID: readID,
    save: save,
    update: update,
    deleteID: deleteID,
    readEmail: readEmail,
    readUnregisted: readUnregisted,
    readAnonymous: readAnonymous,
    updateStatus: updateStatus,
    updatePassword: updatePassword,
    updatePassword2: updatePassword2,
};
