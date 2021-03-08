//definition of constants
const saltRounds = 10;
const connect = require('../config/connect');


//function that returns the materials of a request
function readID(req, res) {
    //criar e executar a query de leitura na BD
    const id_request = req.sanitize('id_request').escape();                                                                                                                                       
    connect.con.query('SELECT Occurrence_material.id_material, category, quantity FROM Occurrence_material, Material WHERE id_request = ? and Material.id_material = Occurrence_material.id_material', id_request, function (err, rows, fields) {
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
    const id_request = req.sanitize('id_request').escape();
    const id_material = req.sanitize('id_material').escape();
    const quantity = req.sanitize('quantity').escape();
    var query = "";
        var post = { 
            id_request: id_request,
            id_material: id_material,
            quantity: quantity
        };
        query = connect.con.query('INSERT INTO Occurrence_material SET ?', post, function (err, rows, fields) {
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

//function that updates all the data of an occurrence_material
function update(req, res) {
    //receive form data sent by post
    const id_request = req.sanitize('id_request').escape();
    const id_material = req.sanitize('id_material').escape();
    const quantity = req.sanitize('quantity').escape();
    var query = "";
    query = connect.con.query('UPDATE Occurrence_material SET id_material = ?, quantity = ? WHERE id_request =?', [id_material, quantity, id_request],  function (err, rows, fields) {
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


//function that delete all the data of an occurrence_material
function deleteID(req, res) {
    //create and execute the read query in the database
    const id_request = req.sanitize('id_request').escape();
    const id_material = req.sanitize('id_material').escape();

    connect.con.query('DELETE from Occurrence_material where id_request = ? and id_material = ?', [ id_request, id_material ], function (err, rows, fields) {
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
    readID: readID,
    save: save,
    update: update,
    deleteID: deleteID,
};
