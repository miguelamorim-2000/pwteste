//definition of constants
const saltRounds = 10;
const connect = require('../config/connect');


//function that return the result of callback
function read(req, res) {
    //Create and execute the read query in the database
    connect.con.query('SELECT * from Location order by id_location desc', function (err, rows, fields) {
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

//function that returns the result of an id_location
function readID(req, res) {
    //create and execute the read query in the database
    const id_location = req.sanitize('id_location').escape();                                                                                                                                        
    connect.con.query('SELECT * from Location where id_location = ?', id_location, function (err, rows, fields) {
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

//function that returns the location with a given nif
function readNif(req, res) {
    //create and execute the read query in the database
    const nif_Location = req.sanitize('nif_Location').escape();                                                                                                                                        
    connect.con.query('SELECT * from Location where nif = ?', nif_Location, function (err, rows, fields) {
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

//function that returns the location with a given address
function readAddress(req, res) {
    ///create and execute the read query in the database
    const address_Location = req.sanitize('address_Location').escape();                                                                                                                                        
    connect.con.query('SELECT * from Location where address = ?', address_Location, function (err, rows, fields) {
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


//function that insert 9 parameters
function save(req, res) {
    //receive form data sent by post
    const designation = req.sanitize('designation').escape();
    const type = req.sanitize('type').escape();
    const address = req.sanitize('address').escape();
    const county = req.sanitize('county').escape();
    const district = req.sanitize('district').escape();
    const phone_number = req.sanitize('phone_number').escape();
    const post_code = req.sanitize('post_code').escape();
    const email = req.sanitize('email').escape();
    const nif = req.sanitize('nif').escape();
    var query = "";
        var post = {
            designation: designation,
            type: type,
            address: address,
            county: county,
            district: district,
            phone_number: phone_number,
            post_code: post_code,
            email: email,
            nif: nif
        };
        query = connect.con.query('INSERT INTO Location SET ?', post, function (err, rows, fields) {
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

//function that updates all the data of an id_location
function update(req, res) {
    //receive form data sent by post
    const id_location = req.sanitize('id_location').escape();
    const designation = req.sanitize('designation').escape();
    const type = req.sanitize('type').escape(); 
    const address = req.sanitize('address').escape(); 
    const county = req.sanitize('county').escape(); 
    const district = req.sanitize('district').escape(); 
    const phone_number = req.sanitize('phone_number').escape();  
    const post_code = req.sanitize('post_code').escape();  
    const email = req.sanitize('email').escape(); 
    const nif = req.sanitize('nif').escape();
    var query = "";
  

    query = connect.con.query('UPDATE Location SET designation=?,type=?,address=? ,county=?,district=?,phone_number=?, post_code=? , email=? , nif=? WHERE id_location=?',
    [designation,type,address,county,district,phone_number,post_code,email,nif,id_location],function (err, rows, fields) {
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

//function that delete all the data of an id_location
function deleteID(req, res) {
    //create and execute the read query in the database
    const id_location = req.sanitize('id_location').escape();
    connect.con.query('DELETE from Location where id_location = ?', id_location, function (err, rows, fields) {
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

//function that returns locations with a certain type(Registada)
function readRegisted(req, res) {
    //create and execute the read query in the database
    connect.con.query('SELECT * from Location where type="Registada" order by id_location desc', function (err, rows, fields) {
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

//function that returns how many locations there are with a certain type(Registada)
function countLocationRegisted(req, res) {
    //create and execute the read query in the database
    connect.con.query('SELECT COUNT(id_location) AS rows from Location where type = "Registada"', function (err, rows, fields) {
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

//export functions
module.exports = {
    read: read,
    readID: readID,
    save: save,
    update: update,
    deleteID: deleteID,
    readRegisted: readRegisted,
    countLocationRegisted: countLocationRegisted,
    readNif: readNif,
    readAddress: readAddress
};
