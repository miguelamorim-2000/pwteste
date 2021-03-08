//definition of constants
const saltRounds = 10;
const connect = require('../config/connect');

//function that return the result of callback
function read(req, res) {
    //create and execute the read query in the database
    connect.con.query('SELECT Operational.id_operational AS id_operational, Candidate.id_candidate AS id_candidate, Candidate.candidate_type AS candidate_type_Candidate, Candidate.qualifications AS qualifications_Candidate, Candidate.name AS name_Candidate, Candidate.cc_number AS cc_number_Candidate, Candidate.cc_validity AS cc_validity_Candidate, Candidate.address AS address_Candidate, Candidate.phone_number AS phone_number_Candidate, Candidate.naturality AS naturality_Candidate, Candidate.email AS email_Candidate, Candidate.birth_date AS birth_date_Candidate, Candidate.district AS district_Candidate, Candidate.county AS county_Candidate, Candidate.post_code AS post_code_Candidate, Operational.patent AS patent_Operational, Operational.operational_type AS operational_type_Operational, Operational.total_credits AS credits_Operational, Operational.state AS state_Operational, Operational.id_user AS id_user_Operational FROM Operational JOIN Candidate ON Operational.id_candidate=Candidate.id_candidate', function (err, rows, fields) {
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
//function that returns the result of an id_operational
function readID(req, res) {
    //create and execute the read query in the database
    const id_operational = req.sanitize('id_operational').escape();                                                                                                                                        
    connect.con.query('SELECT Operational.id_operational AS id_operational, Candidate.id_candidate AS id_candidate, Candidate.candidate_type AS candidate_type_Candidate, Candidate.qualifications AS qualifications_Candidate, Candidate.name AS name_Candidate, Candidate.cc_number AS cc_number_Candidate, Candidate.cc_validity AS cc_validity_Candidate, Candidate.address AS address_Candidate, Candidate.phone_number AS phone_number_Candidate, Candidate.naturality AS naturality_Candidate, Candidate.email AS email_Candidate, Candidate.birth_date AS birth_date_Candidate, Candidate.district AS district_Candidate, Candidate.county AS county_Candidate, Candidate.post_code AS post_code_Candidate, Operational.patent AS patent_Operational, Operational.operational_type AS operational_type_Operational, Operational.total_credits AS credits_Operational, Operational.state AS state_Operational, Operational.id_user AS id_user FROM Operational JOIN Candidate ON Operational.id_candidate=Candidate.id_candidate where id_operational = ?', id_operational, function (err, rows, fields) {
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

//function that returns operationals with a certain type(Gestor de Operações)
function readTypeGestor(req, res) {
    //create and execute the read query in the database
    connect.con.query('SELECT Operational.id_operational AS id_operational, Candidate.id_candidate AS id_candidate, Candidate.candidate_type AS candidate_type_Candidate, Candidate.qualifications AS qualifications_Candidate, Candidate.name AS name_Candidate, Candidate.cc_number AS cc_number_Candidate, Candidate.cc_validity AS cc_validity_Candidate, Candidate.address AS address_Candidate, Candidate.phone_number AS phone_number_Candidate, Candidate.naturality AS naturality_Candidate, Candidate.email AS email_Candidate, Candidate.birth_date AS birth_date_Candidate, Candidate.district AS district_Candidate, Candidate.county AS county_Candidate, Candidate.post_code AS post_code_Candidate, Operational.patent AS patent_Operational, Operational.operational_type AS operational_type_Operational, Operational.state AS state_Operational, Operational.total_credits AS credits_Operational, Operational.id_user AS id_user FROM Operational JOIN Candidate ON Operational.id_candidate=Candidate.id_candidate where operational_type = "Gestor de Operações"', function (err, rows, fields) {
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

//function that insert 5 parameters
function save(req, res) {
    //receive form data sent by post
    const id_candidate = req.sanitize('id_candidate').escape();
    const id_user = req.sanitize('id_user').escape();
    const operational_type = req.sanitize('operational_type').escape();
    const patent = req.sanitize('patent').escape();   
    const credits = req.sanitize('credits').escape();
    var query = "";
        var post = {
            id_candidate: id_candidate,
            id_user: id_user,
            operational_type: operational_type,
            patent: patent,
            total_credits: credits
        };
        query = connect.con.query('INSERT INTO Operational SET ?', post, function (err, rows, fields) {
            console.log(query.sql);
            console.log(err)
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

//function that updates all the data of an id_operationals
function update(req, res) {
    //receive form data sent by post
    const id_operational = req.sanitize('id_operational').escape();
    const id_candidate = req.sanitize('id_candidate').escape();
    const id_user = req.sanitize('id_user').escape();
    const operational_type = req.sanitize('operational_type').escape();
    const patent= req.sanitize('patent_Operational').escape();   
    const credits = req.sanitize('credits').escape();
    const name = req.sanitize('name_Candidate').escape();
    const candidate_type = req.sanitize('candidate_type_Candidate').escape();
    const qualifications = req.sanitize('qualifications_Candidate').escape();
    const phone_number = req.sanitize('phone_number_Candidate').escape();
    const state = req.sanitize('state').escape();

    console.log("without hahsh:" + req.body.pass);
    var query = "";
    query = connect.con.query('UPDATE Operational JOIN Candidate ON Operational.id_candidate = Candidate.id_candidate SET Candidate.name = ?, Candidate.candidate_type =?, Candidate.qualifications =?, Operational.patent=?, Candidate.phone_number =?, Operational.state =? WHERE id_operational = ?', [name, candidate_type, qualifications, patent, phone_number, state, id_operational], function (err, rows, fields) {
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

//function that update a operacional's state
function updateState(req, res) {
    //receive form data sent by post
    const id_operational = req.sanitize('id_operational').escape();
    const state_Operational = req.sanitize('state_Operational').escape();
    console.log("without hahsh:" + req.body.pass);
    var query = "";
    query = connect.con.query('UPDATE Operational SET Operational.state=? WHERE id_operational = ?', [state_Operational, id_operational], function (err, rows, fields) {
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

//function that delete all the data of an id_operational
function deleteID(req, res) {
    //create and execute the read query in the database
    const id_operational = req.sanitize('id_operational').escape();
    connect.con.query('DELETE from Operational where id_operational = ?', id_operational, function (err, rows, fields) {
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

//function that returns a operational's id_user
function GetUserOperational(req, res) {
    const id_operational= req.sanitize('id_operational').escape();
    const query = connect.con.query('SELECT id_user FROM Operational WHERE id_operational =?', id_operational, function (err, rows, fields){
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

//function that update a operational's id_user
function ChangeUserOperational(req, res) {
    const id_user = req.sanitize('id_user').escape();
    const id_operational = req.sanitize('id_operational').escape();
    var query="";
    if (id_user != "NULL" && (id_operational) != "NULL" && typeof (id_user) != 'undefined' && typeof(id_operational) != 'undefiend') {
        query = connect.con.query('UPDATE Operational SET id_user=? where id_operational=? ',[id_user,id_operational], function(err, rows, fields){
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

//function that returns a operational's id_candidate
function GetCandidateOperational(req, res) {
    const id_operational = req.sanitize('id_operational').escape();
    const query = connect.con.query('SELECT id_candidate FROM Operational WHERE id_operational =?', id_operational, function (err, rows, fields){
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

//function that update a operational's id_candidate
function ChangeCandidateOperational(req, res) {
    const id_candidate = req.sanitize('id_candidate').escape();
    const id_operational = req.sanitize('id_operational').escape();
    var query="";
    if (id_candidate != "NULL" && (id_operational) != "NULL" && typeof (id_candidate) != 'undefined' && typeof(id_operational) != 'undefiend') {
        query = connect.con.query('UPDATE Operational SET id_candidate=? where id_operational=? ',[id_candidate,id_operational], function(err, rows, fields){
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

//function that returns how many locations there are 
function countOperational(req, res) {
    //create and execute the read query in the database
    connect.con.query('SELECT COUNT(id_operational) AS rows from Operational', function (err, rows, fields) {
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

//function that returns operationals with a certain type(Gestor de Operações)
function readManager(req, res) {
    //create and execute the read query in the database
    const op = 'Gestor de Operações';
    connect.con.query('SELECT id_operational from Operational where operational_type = ?', op, function (err, rows, fields) {
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

function savePhoto(req, res) {
    const id_user = req.sanitize('id_user').escape();
    const photo= req.sanitize('photo').escape();
    var query="";
        query = connect.con.query('UPDATE Operational SET photo=? where id_user=? ',[photo,id_user], function(err, rows, fields){
            console.log(query.sql);
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
    GetUserOperational: GetUserOperational,
    ChangeUserOperational: ChangeUserOperational,
    GetCandidateOperational: GetCandidateOperational,
    ChangeCandidateOperational: ChangeCandidateOperational,
    countOperational: countOperational,
    readManager: readManager,
    updateState: updateState,
    readTypeGestor: readTypeGestor,
    savePhoto: savePhoto
};
