const authController = require('../controllers/auth.controller.js');
const { get } = require('../server.js');
module.exports = function(app, passport) {
    
     //SIGNUP CITIZEN
    app.post('/signup/Citizen', passport.authenticate('local-signupCitizen', {
        successRedirect: '/signupSuccess',
        failureRedirect: '/signup/'
    }));
    //SIGNUP OPERACIONAL
    app.post('/signup/Operacionais', passport.authenticate('local-signupOperacionais', {
        successRedirect: '/signupSuccess/OP',
        failureRedirect: '/signup/OP'
    }));

    //SIGNUP FAIL CIDA
    app.get('/signup', authController.signup,);
    //SIGNUP FAIL OP
    app.get('/signup/OP', authController.signupOP,);
    
     //SIGNUP SUCESS CIDA
    app.get('/signupSuccess', authController.signupSuccess,);
    //SIGNUP SUCESS OP
    app.get('/signupSuccess/OP', authController.signupSuccessOP,);
    
    //SIGNIN CITI
    app.post('/signin', 
        passport.authenticate('local-signin', {
            successRedirect: '/signinSuccess',
            failureRedirect: '/signin'
        }));
    //SIGNIN OP
    app.post('/signin/Operacionais', passport.authenticate('local-signinOperacionais', {
        successRedirect: '/signinSuccess/OP',
        failureRedirect: '/signin/OP'
    }));

    //SIGNIN FAIL CIDA
    app.get('/signin', authController.signin,);
    //SIGNIN FAIL OP
    app.get('/signin/OP', authController.signinOP,);
    
    //SIGNIN SUCESS CIDA
    app.get('/signinSuccess', authController.signinSuccess,);
    //SIGNIN SUCESS OP
    app.get('/signinSuccess/OP', authController.signinSuccessOP,);
    
    //LOGOUT
    app.get('/logout', authController.logout);
    
    //UPLOAD IMAGENS
     app.post('/upload',authController.upload,);
    //UPLOAD IMAGENS 
     app.post('/upload/OP',authController.uploadOP,);
    
};
