const { response } = require("express");
const { Session } = require("express-session");
const { session } = require("passport");
const got= require("got");
const connect = require('../config/connect');
const { sanitize } = require('express-validator/filter');
const jsonMessages= require('../assets/jsonMessages/login')
var exports = module.exports = {};
const request = require('request');
var path = require('path');
//SIGNUP CITI
exports.signup = function(req, res) {
    request.get('http://127.0.0.1:8080/logout');
        res.status(jsonMessages.user.duplicate.status).send(jsonMessages.user.duplicate);
    
    
};
//SIGNUP OP
exports.signupOP = function(req, res) {
    request.get('http://127.0.0.1:8080/logout');
    res.status(jsonMessages.user.duplicateOP.status).send(jsonMessages.user.duplicateOP);
    
    
};

//SIGNUP SUCESS OP
exports.signupSuccessOP = function(req, res) {
    request.get('http://127.0.0.1:8080/logout');
    res.status(jsonMessages.user.signupSuccessOP.status).send(jsonMessages.user.signupSuccessOP);
    
 
};


//SIGNUP SUCESS CITIZEN
exports.signupSuccess = function(req, res,next) {
    const id_user=global.sessData.passport.user;

connect.con.query('SELECT nome,apelido from users where id=?',id_user, function (err, rows, fields) {
    if (!err) {
        //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
        if (rows.length == 0) {
            res.status(404).send({
                "msg": "data not found"
            });
        } else {
            //MSG QUE VAI DAR
            var msgFinal={  signupSuccess: {
                msg: "Signup Success",
                message: {
                    eng: "Signup with sucess",
                    pt: "Registo efetuado com sucesso"
                },
                status: 200,url2: "/_static/grup1/Front-end/frontoffice/LoginCitizen.html",
                success: true
            }
            }
            res.send(msgFinal);
            request.post('http://127.0.0.1:8080/Denouncers/passport', {form:{id_user:id_user,name:rows[0].nome+" "+rows[0].apelido}});
            next();
            request.get('http://127.0.0.1:8080/logout');
            res.end();
        }
    } else
    res.status(400).send({
        "msg": err.code
    });

});
 


};

//SIGNIN OP
exports.signinOP = function(req, res) {
    res.status(jsonMessages.user.invalidOP.status).send(jsonMessages.user.invalidOP);
};
//SIGNIN CITI
exports.signin = function(req, res) {
    res.status(jsonMessages.user.invalid.status).send(jsonMessages.user.invalid);
};


//SIGNIN SUCESS CITI
exports.signinSuccess = function(req, res,next) {
        //criar e executar a query de leitura na BD
        const id_user = global.sessData.passport.user;                                                                                                                                        
        connect.con.query('SELECT id_denouncer,name,address,gender,cc_number,DATE_FORMAT(cc_validity,"%Y-%m-%d")AS cc_validity,naturality,phone_number,DATE_FORMAT(birth_date,"%Y-%m-%d") AS birth_date,id_user,district,county,post_code,users.email,Denouncer.photo from Denouncer JOIN users on Denouncer.id_user=users.id where id_user = ?',id_user, function (err, rows, fields) {
            if (!err) {
                //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
                if (rows.length == 0) {
                    res.status(404).send({
                        "msg": "data not found"
                    });
                } else {
                    
                    var msgFinal={ MSG: rows[0],
                        msg: "Success",
                        message: {
                            eng: "Login with sucess",
                            pt: "Login com sucesso"
                        },
                        status: 200, url2: "/_static/grup1/Front-end/backoffice/AreaCidadao.html",
                        success: true
                    }
                    
                    res.send(msgFinal);
     
                }
            } else
            res.status(400).send({
                "msg": err.code
            });

        });
     

};

//SIGNIN SUCESSOP
exports.signinSuccessOP = function(req, res,next) {
        //criar e executar a query de leitura na BD
        const id_user = global.sessData.passport.user;                                                                                                                                        
        connect.con.query('SELECT Operational.*,Candidate.name,Candidate.id_candidate from Operational JOIN Candidate  on Operational.id_candidate=Candidate.id_candidate where id_user=?',id_user, function (err, rows, fields) {
            if (!err) {
                //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
                if (rows.length == 0) {
                    res.status(404).send({
                        "msg": "data not found"
                    });
                } else {
                    
                    var msgFinal={ MSG: rows[0],
                        msg: "Success",
                        message: {
                            eng: "Login with sucess",
                            pt: "Login com sucesso"
                        },
                        status: 200, url2: "/_static/grup1/Front-end/backoffice/index.html",
                        success: true
                    }
                    
                    res.send(msgFinal);
     
                }
            } else
            res.status(400).send({
                "msg": err.code
            });

        });
     

};



//LOGOUT
exports.logout = function(req, res, err) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
            res.status(jsonMessages.user.logoutError.status).send(jsonMessages.user.logoutError);
        }
        res.status(jsonMessages.user.logoutSuccess.status).send(jsonMessages.user.logoutSuccess);
    });
};
//session: Session { cookie: [Object] }
exports.upload= function(req, res) {
   const id_user = req.sanitize('id_user').escape(); 
   let sampleFile = req.files.sampleFile;
   console.log(sampleFile);
   let  uploadPath ='/home/ec2-user/environment/grup1/Back-end/assets/usersPhotos/'+sampleFile.name;
   console.log(__dirname);
   
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.'); 
    };

    if (req.files.sampleFile.size>5242880) {
        return res.status(469).send('No files were upload , please select a image with less Storage'); 
      };

    if(path.extname(sampleFile.name)==".jpg"||path.extname(sampleFile.name)==".PNG"||path.extname(sampleFile.name)==".gif"||path.extname(sampleFile.name)==".png"){
        

    sampleFile.mv(uploadPath, function(err) {
        if (err)
          return res.status(500).send(err);
        
          request.post('http://127.0.0.1:8080/Denouncers/photo', {form:{id_user:id_user,photo:sampleFile.name}});
        res.send('File uploaded!');
      });
    }else{
        return res.status(470).send('No files were uploaded: wrong compatibility'); 

    }
    

}



exports.uploadOP= function(req, res) {
   const id_user = req.sanitize('id_user').escape(); 
   let sampleFile = req.files.sampleFile;
   console.log(sampleFile);
   let  uploadPath ='/home/ec2-user/environment/grup1/Back-end/assets/usersPhotos/'+sampleFile.name;
   
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.'); 
    };

    if (req.files.sampleFile.size>5242880) {
        return res.status(469).send('No files were upload , please select a image with less Storage'); 
      };

    if(path.extname(sampleFile.name)==".jpg"||path.extname(sampleFile.name)==".PNG"||path.extname(sampleFile.name)==".png"||path.extname(sampleFile.name)==".JPG"||path.extname(sampleFile.name)==".jpeg"||path.extname(sampleFile.name)==".JPEG"){
        

    sampleFile.mv(uploadPath, function(err) {
        if (err)
          return res.status(500).send(err);
        
          request.put('http://127.0.0.1:8080/Operational/Photo/', {form:{id_user:id_user,photo:sampleFile.name}});
        res.send('File uploaded!');
      });
    }else{
        return res.status(400).send('No files were uploaded: wrong compatibility'); 

    }
    

}