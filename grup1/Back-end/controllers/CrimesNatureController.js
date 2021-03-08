//definition of constants
const saltRounds = 10;
const connect = require('../config/connect');


//function that return the result of callback
function read(req, res) {
    //Create and execute the read query in the database
    connect.con.query('SELECT * from Crime_Nature order by id_crime_nature desc', function (err, rows, fields) {
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

//function that returns the result of an id_crime_nature
function readID(req, res) {
    //create and execute the read query in the database
    const id_crime_nature = req.sanitize('id_crime_nature').escape();                                                                                                                                        
    connect.con.query('SELECT * from Crime_Nature where id_crime_nature = ?', id_crime_nature, function (err, rows, fields) {
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
function save(req, res) {
    //receive form data sent by post
    const id_crime_nature = req.sanitize('id_crime_nature').escape();
    const designation = req.sanitize('designation').escape();
    var query = "";
        var post = {
            id_crime_nature: id_crime_nature,
            designation: designation
        };
        query = connect.con.query('INSERT INTO Crime_Nature SET ?', post, function (err, rows, fields) {
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




//function that updates all the data of an id_crime_nature
function update(req, res) {
    //receive form data sent by post
    const designation = req.sanitize('designation').escape();
    const id_crime_nature=req.sanitize('id_crime_nature').escape();
    console.log("without hahsh:" + req.body.pass);
    var query = "";
    
    query = connect.con.query('UPDATE Crime_Nature SET designation = ? where id_crime_nature=?', [designation,id_crime_nature], function (err, rows, fields) {
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



//function that delete all the data of an id_crime_nature
function deleteID(req, res) {
    //create and execute the read query in the database
    const id_crime_nature = req.sanitize('id_crime_nature').escape();
    connect.con.query('DELETE from Crime_Nature where id_crime_nature = ?', id_crime_nature, function (err, rows, fields) {
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


//export functions
module.exports = {
    read: read,
    readID: readID,
    save: save,
    update: update,
    deleteID: deleteID
};
