//definition of constants
const saltRounds = 10;
const connect = require('../config/connect');

//function that return the result of callback
function read(req, res) {
    //Create and execute the read query in the database
    connect.con.query('SELECT id_candidate,candidate_type ,qualifications,candidate_situation,name ,cc_number ,DATE_FORMAT(cc_validity,"%Y-%m-%d") AS cc_validity ,address ,phone_number ,naturality  ,email ,DATE_FORMAT(birth_date,"%Y-%m-%d") AS birth_date,photo,district ,county ,post_code from Candidate order by id_candidate desc', function (err, rows, fields) {
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

//function that returns the result of an id_candidate
function readID(req, res) {
    //create and execute the read query in the database
    const id_candidate = req.sanitize('id_candidate').escape();                                                                                                                                        
    connect.con.query('SELECT id_candidate,candidate_type ,qualifications,candidate_situation,name ,cc_number ,DATE_FORMAT(cc_validity,"%Y-%m-%d") AS cc_validity,address ,phone_number ,naturality  ,email ,DATE_FORMAT(birth_date,"%Y-%m-%d") AS birth_date,photo,district ,county ,post_code from Candidate where id_candidate = ?', id_candidate, function (err, rows, fields) {
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


//function that insert 14 parameters
function save(req, res) {
    //receive form data sent by post
    const candidate_type = req.sanitize('candidate_type').escape();
    const qualifications = req.sanitize('qualifications').escape();
    const candidate_situations = req.sanitize('candidate_situations').escape();
    const name = req.sanitize('name').escape();
    const cc_number = req.sanitize('cc_number').escape();
    const cc_validity = req.sanitize('cc_validity').escape();
    const address = req.sanitize('address').escape();
    const phone_number = req.sanitize('phone_number').escape();
    const naturality = req.sanitize('naturality').escape();
    const email = req.sanitize('email').escape();
    const birth_date = req.sanitize('birth_date').escape();
    const district = req.sanitize('district').escape();
    const county = req.sanitize('county').escape();
    const post_code = req.sanitize('post_code').escape();
    var query = "";
        var post = {
            candidate_type: candidate_type,
            qualifications: qualifications,
            candidate_situations: candidate_situations,
            name: name,
            cc_number: cc_number,
            cc_validity: cc_validity,
            address: address,
            phone_number: phone_number,
            naturality: naturality,
            email: email,
            birth_date: birth_date,
            district: district,
            county: county,
            post_code: post_code
        };
        query = connect.con.query('INSERT INTO Candidate SET ?', post, function (err, rows, fields) {
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

//function that returns candidates who are not yet Operational
function readCandidates(req, res) {
    //Create and execute the read query in the database
    connect.con.query('SELECT * FROM Candidate WHERE id_candidate NOT IN (SELECT id_candidate FROM Operational)', function (err, rows, fields) {
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
    readCandidates: readCandidates,
};
