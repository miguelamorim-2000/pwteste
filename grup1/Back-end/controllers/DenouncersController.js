//definition of constants
const saltRounds = 10;
const { sanitize } = require('express-validator/filter');
const connect = require('../config/connect');


//function that return the result of callback
function read(req, res) {
    //Create and execute the read query in the database
    connect.con.query('SELECT * from Denouncer order by id_denouncer desc', function (err, rows, fields) {
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

//function that returns the result of an id_denouncer
function readID(req, res) {
    //create and execute the read query in the database
    const id_denouncer = req.sanitize('id_denouncer').escape();                                                                                                                                        
    connect.con.query('SELECT * from Denouncer where id_denouncer = ?', id_denouncer, function (err, rows, fields) {
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


//function that insert 13 parameters
function save(req, res) {
    //receive form data sent by post
    const id_user = req.sanitize('id_user').escape();
    const address = req.sanitize('address').escape();
    const gender = req.sanitize('gender').escape();
    const cc_number = req.sanitize('cc_number').escape();
    const cc_validity = req.sanitize('cc_validity').escape();
    const naturality = req.sanitize('naturality').escape();
    const phone_number = req.sanitize('phone_number').escape();
    const birth_date = req.sanitize('birth_date').escape();
    const name = req.sanitize('name').escape();
    const district = req.sanitize('district').escape();
    const county = req.sanitize('county').escape();
    const post_code = req.sanitize('post_code').escape();
    var query = "";
        var post = {
            id_user: id_user,
            address: address,
            gender: gender,
            cc_number: cc_number,
            cc_validity: cc_validity,
            post_code: post_code,
            naturality: naturality,
            phone_number: phone_number,
            birth_date: birth_date,
            name: name,
            district: district,
            county: county,
            post_code: post_code
        };
        query = connect.con.query('INSERT INTO Denouncer SET ?', post, function (err, rows, fields) {
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




//function that updates all the data of an id_denouncer
function update(req, res) {
    //receive form data sent by post
    const id_denouncer = req.sanitize('id_denouncer').escape();
    const address = req.sanitize('address').escape();
    const gender = req.sanitize('gender').escape();
    const cc_number = req.sanitize('cc_number').escape();
    const cc_validity = req.sanitize('cc_validity').escape();
    const naturality = req.sanitize('naturality').escape();
    const phone_number = req.sanitize('phone_number').escape();
    const birth_date = req.sanitize('birth_date').escape();
    const name = req.sanitize('name').escape();
    const district = req.sanitize('district').escape();
    const county = req.sanitize('county').escape();
    const post_code = req.sanitize('post_code').escape();
    var query = "";
    query = connect.con.query('UPDATE Denouncer SET address = ?, gender = ?, cc_number = ?, cc_validity = ?, naturality = ?, phone_number = ?, birth_date = ?, name = ?, district = ?, county = ?, post_code = ? where id_denouncer= ?', [address, gender, cc_number, cc_validity, naturality, phone_number, birth_date, name, district, county, post_code, id_denouncer], function (err, rows, fields) {
        if (!err) {
            console.log("Number of records updated: " + rows.affectedRows);
            res.status(200).send({"msg": "update with success"});
        } else {
            res.status(400).send({"msg": err.code});
            console.log('Error while performing Query.', err);
        }
    });
}



//function that delete all the data of an id_denouncer
function deleteID(req, res) {
    //create and execute the read query in the database
    const id_denouncer = req.sanitize('id_denouncer').escape();
    connect.con.query('DELETE from Denouncer where id_denouncer = ?', id_denouncer, function (err, rows, fields) {
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


//function that returns a denouncer's id_user
function GetUserDenouncer(req, res) {
    const id_denouncer = req.sanitize('id_denouncer').escape();
    const query = connect.con.query('SELECT id_user FROM Denouncer WHERE id_denouncer =?', id_denouncer, function (err, rows, fields){
        console.log(query.sql);
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

//function that updates a denouncer's id_user
function ChangeUserDenouncer(req, res) {
    //receive form data sent by post
    const id_user = req.sanitize('id_user').escape();
    const id_denouncer = req.sanitize('id_denouncer').escape();
    var query="";
    if (id_user != "NULL" && (id_denouncer) != "NULL" && typeof (id_user) != 'undefined' && typeof(id_denouncer) != 'undefiend') {
        query = connect.con.query('UPDATE Denouncer SET id_user=? where id_denouncer=? ',[id_user,id_denouncer], function(err, rows, fields){
            console.log(query.sql);
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
}

//function that returns the denouncer with a given cc_number
function readCC(req, res) {
    
    const cc = req.sanitize('cc_Denouncer').escape();
    connect.con.query('SELECT id_denouncer from Denouncer where cc_number = ?', cc, function (err, rows, fields) {
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

//function that insert 2 parameters
function saveID(req, res) {
    //receive form data sent by post
    const id_user = req.sanitize('id_user').escape();
    const name = req.sanitize('name').escape();

    var query = "";
        var post = {
            id_user: id_user,
            name: name,
        };
        query = connect.con.query('INSERT INTO Denouncer SET ?', post, function (err, rows, fields) {
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
};

function savePhoto(req, res) {
    //receber os dados do formuário que são enviados por post
    const id_user = req.sanitize('id_user').escape();
    const photo= req.sanitize('photo').escape();

    var query = "";
        query = connect.con.query('UPDATE Denouncer SET photo=? WHERE id_user=? ',[photo,id_user], function (err, rows, fields) {
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

function readPhoto(req, res) {
    const id_user = req.sanitize('id_user').escape();
    //criar e executar a query de leitura na BD
    connect.con.query('SELECT photo from Denouncer where id_user=?',id_user, function (err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
            if (rows.length == 0) {
                res.status(404).send("Data not found");
            } else {
            res.status(200).send(rows);
        }
    } else
    console.log('Error while performing Query.', err);
    });
}


//export functions
module.exports = {
    read: read,
    readID: readID,
    save: save,
    update: update,
    deleteID: deleteID,
    GetUserDenouncer: GetUserDenouncer,
    ChangeUserDenouncer: ChangeUserDenouncer,
    readCC: readCC,
    saveID: saveID,
    savePhoto: savePhoto,
    readPhoto: readPhoto
};