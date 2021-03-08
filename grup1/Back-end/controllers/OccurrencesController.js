//definition of constants
const saltRounds = 10;
const connect = require('../config/connect');

//function that returns how many occurrences there are with a certain state(Em Processo) - filtered by regions and date
function readDailyRegioesCountProcess(req, res) {
    //create and execute the read query in the database
connect.con.query('Select count(*) AS Lisboa,(Select count(*) from Occurrence JOIN Request on Request.id_request=Occurrence.id_request JOIN Location on Request.id_location=Location.id_location where Occurrence.state="Em Processo" and DATE_FORMAT(Occurrence.arrival_date,"%Y-%m-%d")=DATE_FORMAT(CURDATE(),"%Y-%m-%d") and (Location.district="Braga" or Location.district="Porto" or Location.district="Viana do Castelo" or Location.district="Vila Real" or Location.district="Bragança" or Location.district="Aveiro" or Location.district="Viseu" or Location.district="Guarda") ) AS Norte,(Select count(*)  from Occurrence JOIN Request on Request.id_request=Occurrence.id_request JOIN Location on Request.id_location=Location.id_location Where Occurrence.state="Em Processo" and DATE_FORMAT(Occurrence.arrival_date,"%Y-%m-%d")=DATE_FORMAT(CURDATE(),"%Y-%m-%d") and  (Location.district="Setúbal" or Location.district="Évora" or Location.district="Beja" or Location.district="Alentejo")) AS Alentejo,(Select count(*)  from Occurrence JOIN Request on Request.id_request=Occurrence.id_request JOIN Location on Request.id_location=Location.id_location where Occurrence.state="Em Processo" and DATE_FORMAT(Occurrence.arrival_date,"%Y-%m-%d")=DATE_FORMAT(CURDATE(),"%Y-%m-%d") and Location.district="Faro") AS Algarve,(Select count(*)  from Occurrence JOIN Request on Request.id_request=Occurrence.id_request JOIN Location on Request.id_location=Location.id_location where Occurrence.state="Em Processo" and DATE_FORMAT(Occurrence.arrival_date,"%Y-%m-%d")=DATE_FORMAT(CURDATE(),"%Y-%m-%d") and  (Location.district="Coimbra" or Location.district="Castelo Branco" or Location.district="Leiria" or Location.district="Santarém" or Location.district="Portalegre") ) AS Centro FROM Occurrence JOIN Request on Request.id_request=Occurrence.id_request JOIN Location on Request.id_location=Location.id_location where Occurrence.state="Em Processo" and Location.district="Lisboa" and DATE_FORMAT(Occurrence.arrival_date,"%Y-%m-%d")=DATE_FORMAT(CURDATE(),"%Y-%m-%d")', function (err, rows, fields) {
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

//function that returns how many occurrences there are with a certain state(Em Processo) - filtered by regions 
function readActiveRegioesCountProcess(req, res) {
    //create and execute the read query in the database
connect.con.query('Select count(*) AS Lisboa,(Select count(*) from Occurrence JOIN Request on Request.id_request=Occurrence.id_request JOIN Location on Request.id_location=Location.id_location where Occurrence.state="Em Processo" and (Location.district="Braga" or Location.district="Porto" or Location.district="Viana do Castelo" or Location.district="Vila Real" or Location.district="Bragança" or Location.district="Aveiro" or Location.district="Viseu" or Location.district="Guarda") ) AS Norte,(Select count(*)  from Occurrence JOIN Request on Request.id_request=Occurrence.id_request JOIN Location on Request.id_location=Location.id_location Where Occurrence.state="Em Processo" and  (Location.district="Setubal" or Location.district="Évora" or Location.district="Beja" or Location.district="Alentejo")) AS Alentejo,(Select count(*)  from Occurrence JOIN Request on Request.id_request=Occurrence.id_request JOIN Location on Request.id_location=Location.id_location where Occurrence.state="Em Processo" and Location.district="Faro") AS Algarve,(Select count(*)  from Occurrence JOIN Request on Request.id_request=Occurrence.id_request JOIN Location on Request.id_location=Location.id_location where Occurrence.state="Em Processo" and  (Location.district="Coimbra" or Location.district="Castelo Branco" or Location.district="Leiria" or Location.district="Santarém" or Location.district="Portalegre") ) AS Centro FROM Occurrence JOIN Request on Request.id_request=Occurrence.id_request JOIN Location on Request.id_location=Location.id_location where Location.district="Lisboa" and Occurrence.state="Em Processo"', function (err, rows, fields) {
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


//function that returns how many occurrences there are - filtered by regions and month
function readPerMounthRegioesCountProcess(req, res) {
    //create and execute the read query in the database
connect.con.query('Select count(*) AS Lisboa,(Select count(*) from Occurrence JOIN Request on Request.id_request=Occurrence.id_request JOIN Location on Request.id_location=Location.id_location where DATE_FORMAT(Occurrence.arrival_date,"%Y-%m")=DATE_FORMAT(CURDATE(),"%Y-%m") and (Location.district="Braga" or Location.district="Porto" or Location.district="Viana do Castelo" or Location.district="Vila Real" or Location.district="Bragança" or Location.district="Aveiro" or Location.district="Viseu" or Location.district="Guarda") ) AS Norte,(Select count(*)  from Occurrence JOIN Request on Request.id_request=Occurrence.id_request JOIN Location on Request.id_location=Location.id_location Where DATE_FORMAT(Occurrence.arrival_date,"%Y-%m")=DATE_FORMAT(CURDATE(),"%Y-%m") and  (Location.district="Setubal" or Location.district="Évora" or Location.district="beja")) AS Alentejo,(Select count(*)  from Occurrence JOIN Request on Request.id_request=Occurrence.id_request JOIN Location on Request.id_location=Location.id_location where DATE_FORMAT(Occurrence.arrival_date,"%Y-%m")=DATE_FORMAT(CURDATE(),"%Y-%m") and Location.district="Faro") AS Algarve,(Select count(*)  from Occurrence JOIN Request on Request.id_request=Occurrence.id_request JOIN Location on Request.id_location=Location.id_location where DATE_FORMAT(Occurrence.arrival_date,"%Y-%m")=DATE_FORMAT(CURDATE(),"%Y-%m") and  (Location.district="Coimbra" or Location.district="Castelo Branco" or Location.district="Leiria" or Location.district="Santarém" or Location.district="Portalegre") ) AS Centro FROM Occurrence JOIN Request on Request.id_request=Occurrence.id_request JOIN Location on Request.id_location=Location.id_location where Location.district="Lisboa" and DATE_FORMAT(Occurrence.arrival_date,"%Y-%m")=DATE_FORMAT(CURDATE(),"%Y-%m")', function (err, rows, fields) {
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

//function that returns how many occurrences there are with a certain state(Em Processo; Pendente; Concluído) and how many requests there are with a certain state(Aguardar) - filtered by month
function readCountProcess(req, res) {
    //create and execute the read query in the database
connect.con.query('SELECT count(*) AS requestPendents, (SELECT COUNT(*) from Occurrence where Occurrence.state = "Em Processo") AS activeOccurrences, (SELECT COUNT(*) from Occurrence where Occurrence.state = "Pendente") AS pendentsOccurrences, (SELECT COUNT(*) AS rows from Occurrence where Occurrence.state = "Concluído") AS solvedOccurrences from Request where Request.state="Aguardar" ', function (err, rows, fields) {
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

//function that returns the percentage of requests with a certain state(Arquivado)
function readfakes(req, res) {
    //create and execute the read query in the database
connect.con.query('Select (count(*)*100)/(Select count(*) from Request where date_format(date,"%Y-%m")=date_format(CURDATE(),"%Y-%m") ) AS Perc  from Request WHERE Request.state="ARQUIVADO" AND date_format(date,"%Y-%m")=date_format(CURDATE(),"%Y-%m")', function (err, rows, fields) {
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

//function that returns how many occurrences there are - filtered by month
function readPorMes(req, res) {
    //create and execute the read query in the database
connect.con.query('Select DATE_FORMAT(arrival_date,"%Y,%m") AS MOUNTH_YEAR,count(*) AS ROWS from Occurrence group by MOUNTH_YEAR', function (err, rows, fields) {
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

//function that returns occurrences with a certain arrival_date, order by regions
function readDiarioRegioes(req, res) {
    //create and execute the read query in the database
connect.con.query('Select * from Occurrence JOIN Request on Occurrence.id_request=Request.id_Request JOIN Location on Location.id_location=Request.id_location where Occurrence.arrival_date=CURDATE() order by district', function (err, rows, fields) {
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

//function that returns how many occurrences there are with a certain state(Concluído)
function readDiarioResolvido(req, res) {
    //create and execute the read query in the database
connect.con.query('Select COUNT(*) AS rows from Occurrence JOIN Request on Occurrence.id_request=Request.id_Request JOIN Crime_Nature on Request.id_crime_nature=Crime_Nature.id_crime_nature WHERE Occurrence.state="Concluído" ', function (err, rows, fields) {
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

//function that returns how many occurrences there are with a certain degree_of_emergency(Grave) and state(Em Processo)
function readAtivosGraves(req, res) {
    //create and execute the read query in the database
connect.con.query('Select COUNT(*) AS rows from Occurrence JOIN Request on Occurrence.id_request=Request.id_Request WHERE Request.degree_of_emergency="Grave" AND Occurrence.state ="Em Processo"', function (err, rows, fields) {
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

//function that returns how many occurrences there are with a certain degree_of_emergency(Moderada) and state(Em Processo)
function readAtivosModeradas(req, res) {
    //create and execute the read query in the database
connect.con.query('Select COUNT(*) AS rows from Occurrence JOIN Request on Occurrence.id_request=Request.id_Request WHERE Request.degree_of_emergency="Moderada" AND Occurrence.state ="Em Processo"', function (err, rows, fields) {
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

//function that returns how many occurrences there are with a certain degree_of_emergency(Muito Grave) and state(Em Processo)
function readAtivosMuitoGraves(req, res) {
    //create and execute the read query in the database
connect.con.query('Select COUNT(*) AS rows from Occurrence JOIN Request on Occurrence.id_request=Request.id_Request WHERE Request.degree_of_emergency="Muito Grave" AND Occurrence.state="Em Processo"', function (err, rows, fields) {
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

//function that returns how many occurrences there are with a certain arrival_date
function readDiario(req, res) {
    //create and execute the read query in the database
connect.con.query('Select COUNT (*) AS rows from Occurrence WHERE arrival_date=CURDATE()', function (err, rows, fields) {
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

//function that returns occurrences with a certain arrival_date 
function readDiariasRelatorio(req, res) {
    //create and execute the read query in the database
connect.con.query('SELECT Occurrence.id_occurrence AS id_occurrence,Location.designation AS designation_Location,Location.address AS address_Location,Location.id_location as id_location,Request.type AS type_Request,Request.state as state_Request,Crime_Nature.designation AS designation_Crime_Nature,Request.degree_of_emergency AS degree_of_emergency_Crime_Nature,Crime_Nature.id_crime_nature,Occurrence.state AS state_Occurrence,DATE_FORMAT(Occurrence.arrival_date,"%Y-%m-%d") AS arrival_date_Occurrence, Occurrence.arrival_time AS arrivel_time_Occurrence, Request.id_request AS id_request,DATE_FORMAT(Request.date,"%Y-%m-%d") AS date_Request,Request.time AS time_Request, Request.description AS description_Request, Location.type AS type_Location,Location.county AS county_Location,Location.district AS district_Location , Location.phone_number AS phone_number_Location,Location.post_code AS post_code_Location,Location.email AS email_Location,Location.nif AS nif_Location, Crime_Nature.designation AS designation_Crime_Nature from Occurrence JOIN Request on Occurrence.id_request=Request.id_Request JOIN Location on Location.id_location=Request.id_location JOIN Crime_Nature on Crime_Nature.id_crime_nature=Request.id_crime_nature where Occurrence.arrival_date=CURDATE()', function (err, rows, fields) {
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

//function that return the result of callback
function read(req, res) {
    //create and execute the read query in the database
    connect.con.query('SELECT Occurrence.id_occurrence AS id_occurrence,Location.designation AS designation_Location,Location.address AS address_Location,Location.id_location as id_location,Request.type AS type_Request,Request.state as state_Request,Crime_Nature.designation AS designation_Crime_Nature,Request.degree_of_emergency AS degree_of_emergency_Crime_Nature,Crime_Nature.id_crime_nature,Occurrence.state AS state_Occurrence,DATE_FORMAT(Occurrence.arrival_date,"%Y-%m-%d") AS arrival_date_Occurrence, Occurrence.arrival_time AS arrivel_time_Occurrence, Request.id_request AS id_request,DATE_FORMAT(Request.date,"%Y-%m-%d") AS date_Request,Request.time AS time_Request,Location.type AS type_Location,Location.county AS county_Location,Location.district AS district_Location , Location.phone_number AS phone_number_Location,Location.post_code AS post_code_Location,Location.email AS email_Location,Location.nif AS nif_Location FROM Occurrence JOIN Request ON Occurrence.id_request=Request.id_request JOIN Location ON Location.id_location=Request.id_location JOIN Crime_Nature ON Request.id_crime_nature=Crime_Nature.id_crime_nature ', function (err, rows, fields) {
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


//function that returns the result of an id_occurrence
function readID(req, res) {
    //create and execute the read query in the database
    const id_occurrence = req.sanitize('id_occurrence').escape();                                                                                                                                        
    connect.con.query('SELECT Occurrence.id_occurrence AS id_occurrence,Location.designation AS designation_Location,Location.address AS address_Location,Location.id_location as id_location,Request.type AS type_Request,Request.state as state_Request,Crime_Nature.designation AS designation_Crime_Nature,Request.degree_of_emergency AS degree_of_emergency_Crime_Nature,Crime_Nature.id_crime_nature,Occurrence.state AS state_Occurrence,DATE_FORMAT(Occurrence.arrival_date,"%Y-%m-%d") AS arrival_date_Occurrence, Occurrence.arrival_time AS arrivel_time_Occurrence, Request.id_operations_manager AS id_operations_manager, Request.id_request AS id_request,DATE_FORMAT(Request.date,"%Y-%m-%d") AS date_Request,Request.time AS time_Request,Location.type AS type_Location,Location.county AS county_Location,Location.district AS district_Location , Location.phone_number AS phone_number_Location,Location.post_code AS post_code_Location,Location.email AS email_Location,Location.nif AS nif_Location FROM Occurrence JOIN Request ON Occurrence.id_request=Request.id_request JOIN Location ON Location.id_location=Request.id_location JOIN Crime_Nature ON Request.id_crime_nature=Crime_Nature.id_crime_nature WHERE id_occurrence = ?', id_occurrence, function (err, rows, fields) {
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

//function that insert 6 parameters
function save(req, res) {
    //receive form data sent by post
    const id_occurrence = req.sanitize('id_occurrence').escape();
    const id_team = req.sanitize('id_team').escape();
    const id_request = req.sanitize('id_request').escape();
    const state = req.sanitize('state').escape();
    const arrival_date = req.sanitize('arrival_date').escape();   
    const arrival_time = req.sanitize('arrival_time').escape();
    var query = "";
        var post = { 
            id_occurrence: id_occurrence,
            id_team: id_team,
            id_request: id_request,
            state: state,
            arrival_date: arrival_date,
            arrival_time: arrival_time
        };
        query = connect.con.query('INSERT INTO Occurrence SET ?', post, function (err, rows, fields) {
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

//function that updates all the data of an id_occurrence
function update(req, res) {
    //receive form data sent by post
    const id_occurrence = req.sanitize('id_occurrence').escape();
    const state = req.sanitize('state').escape();

    var query = "";
    query = connect.con.query('UPDATE Occurrence SET state = ? WHERE id_occurrence = ?', [state, id_occurrence], function (err, rows, fields) {
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


//function that delete all the data of an id_occurrence
function deleteID(req, res) {
    //create and execute the read query in the database
    const id_occurrence = req.sanitize('id_occurrence').escape();
    connect.con.query('DELETE from Occurrence where id_occurrence = ?', id_occurrence, function (err, rows, fields) {
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

//function that returns a occurrence's request
function GetRequestOccurrence(req, res) {
    const id_occurrence = req.sanitize('id_occurrence').escape();
    const query = connect.con.query('SELECT id_request FROM Occurrence WHERE id_occurrence =?', id_occurrence, function (err, rows, fields){
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

//function that update a occurrence's request
function ChangeRequestOccurence(req, res) {
    const id_request = req.sanitize('id_request').escape();
    const id_occurrence = req.sanitize('id_occurrence').escape();
    var query="";
    if (id_request != "NULL" && (id_occurrence) != "NULL" && typeof (id_request) != 'undefined' && typeof(id_occurrence) != 'undefiend') {
        query = connect.con.query('UPDATE Occurrence SET id_request=? where id_occurrence=? ',[id_request,id_occurrence], function(err, rows, fields){
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

//function that returns a occurrence's id_team
function GetTeamOccurrence(req, res) {
    const id_occurrence = req.sanitize('id_occurrence').escape();
    const query = connect.con.query('SELECT id_team FROM Occurrence WHERE id_occurrence =?', id_occurrence, function (err, rows, fields){
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

//function that update a occurrence's id_team
function ChangeTeamOccurrence(req, res) {
    const id_team = req.sanitize('id_team').escape();
    const id_occurrence = req.sanitize('id_occurrence').escape();
    var query="";
    if (id_team != "NULL" && (id_occurrence) != "NULL" && typeof (id_team) != 'undefined' && typeof(id_occurrence) != 'undefiend') {
        query = connect.con.query('UPDATE Occurrence SET id_team=? where id_occurrence=? ',[id_team,id_occurrence], function(err, rows, fields){
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

//function that returns how many occurrences there are with a certain arrival_date
function CountOccurrencesDay(req, res) {
    const arrival_date = req.sanitize('arrival_date').escape();
    connect.con.query('SELECT COUNT(id_occurrence) AS rows from Occurrence where arrival_date = ?', arrival_date, function (err, rows, fields) {
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

//function that returns how many occurrences there are with a certain state(Em Processo)
function CountOccurrencesActive(req, res) {
    //create and execute the read query in the database
    connect.con.query('SELECT COUNT(id_occurrence) AS rows from Occurrence where state = "Em Processo"', function (err, rows, fields) {
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



//function that returns how many occurrences there are with a certain state(Aguardar)
function CountOccurrencesHold(req, res) {
    //create and execute the read query in the database
    connect.con.query('SELECT COUNT(id_occurrence) from Occurrence where state = "Aguardar"', function (err, rows, fields) {
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

//function that returns the percentage of occurrences with a certain state(Concluído)
function PercOccurrencesCompleted(req, res) {
    //create and execute the read query in the database
    connect.con.query('SELECT count(*) * 100.0 / (select count(*) from Occurrence) AS perc from Occurrence where state = "Concluído" ', function (err, rows, fields) {
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

//function that returns the percentage of occurrences with a certain state(Em Processo) and degree_of_emergency(Grave)
function PercAtivasGraves(req, res) {
    //create and execute the read query in the database
    connect.con.query('SELECT count(*) * 100.0 / (select count(*) from Occurrence) AS perc from Occurrence JOIN Request on Occurrence.id_request=Request.id_Request WHERE Request.degree_of_emergency= "Grave" AND Occurrence.state = "Em Processo" ', function (err, perc, fields) {
        if (!err) {
            //checks the results, if the number of rows is 0 returns data not found, otherwise sends the results (rows).
            if (perc.length == 0) {
                res.status(404).send("Data not found");
            } else {
            res.status(200).send(perc);
        }
    } else
    console.log('Error while performing Query.', err);
    });
}

//function that returns the percentage of occurrences with a certain state(Em Processo) and degree_of_emergency(Muito Grave)
function PercAtivasMuitoGraves(req, res) {
    //create and execute the read query in the database
    connect.con.query('SELECT count(*) * 100.0 / (select count(*) from Occurrence) AS perc from Occurrence JOIN Request on Occurrence.id_request=Request.id_Request WHERE Request.degree_of_emergency="Muito Grave" AND Occurrence.state = "Em Processo" ', function (err, perc, fields) {
        if (!err) {
            //checks the results, if the number of rows is 0 returns data not found, otherwise sends the results (rows).
            if (perc.length == 0) {
                res.status(404).send("Data not found");
            } else {
            res.status(200).send(perc);
        }
    } else
    console.log('Error while performing Query.', err);
    });
}

//function that returns how many occurrences there are with a certain state(Em Processo)
function CountActiveOccurrences(req, res) {
    //create and execute the read query in the database
    connect.con.query('SELECT COUNT(id_occurrence) AS rows from Occurrence where state = "Em Processo"', function (err, rows, fields) {
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


//function that returns how many occurrences there are with a certain state(Concluído)
function CountCompletedOccurrences(req, res) {
    //create and execute the read query in the database
    connect.con.query('SELECT count(*) as rows FROM Occurrencer WHERE state = "Concluído" WHERE year(date) = YEAR(DATEADD(MONTH,-1,CURDATE())) AND month(date) = MONTH(DATEADD(MONTH,-1,CURDATE()))', function (err, rows, fields) {
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


//function that update a occurrence's id_operations_manager
function updateManager(req, res) {
    const id_occurrence = req.sanitize('id_occurrence').escape();
    const id_operations_manager = req.sanitize('id_operations_manager').escape();

    var query = "";
    query = connect.con.query('UPDATE Request, Occurrence SET Request.id_operations_manager = ? WHERE Occurrence.id_occurrence = ? AND Occurrence.id_request = Request.id_request', [id_operations_manager, id_occurrence], function (err, rows, fields) {
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



//export functions
module.exports = {
    read: read,
    readID: readID,
    save: save,
    update: update,
    deleteID: deleteID,
    GetRequestOccurrence: GetRequestOccurrence,
    ChangeRequestOccurence: ChangeRequestOccurence,
    GetTeamOccurrence: GetTeamOccurrence,
    ChangeTeamOccurrence: ChangeTeamOccurrence,
    CountOccurrencesActive: CountOccurrencesActive,
    CountOccurrencesHold: CountOccurrencesHold,
    PercOccurrencesCompleted: PercOccurrencesCompleted,
    readDiario:readDiario,
    readDiarioResolvido:readDiarioResolvido,
    readDiarioRegioes:readDiarioRegioes,
    readPorMes:readPorMes,
    readfakes:readfakes,
    readDailyRegioesCountProcess: readDailyRegioesCountProcess,
    readPerMounthRegioesCountProcess: readPerMounthRegioesCountProcess,
    readAtivosGraves: readAtivosGraves,
    readAtivosMuitoGraves: readAtivosMuitoGraves,
    PercAtivasGraves: PercAtivasGraves,
    PercAtivasMuitoGraves: PercAtivasMuitoGraves,
    readAtivosModeradas: readAtivosModeradas,
    CountActiveOccurrences: CountActiveOccurrences,
    CountCompletedOccurrences: CountCompletedOccurrences,
    readDiariasRelatorio: readDiariasRelatorio,
    readActiveRegioesCountProcess: readActiveRegioesCountProcess,
    readCountProcess: readCountProcess,
    updateManager: updateManager,
};
