const app = require('../server');
const controllerUser = require('../controllers/UsersController');
//routes
app.get('/Users/', controllerUser.read);
app.get('/Users/:id', controllerUser.readID);
app.post('/Users/', controllerUser.save);
app.put('/Users/:id', controllerUser.update);
app.delete('/Users/:id', controllerUser.deleteID);
app.get('/UsersEmail/:email', controllerUser.readEmail);
app.get('/UserUnregisted/', controllerUser.readUnregisted);
app.get('/UserAnonymous/', controllerUser.readAnonymous);
app.put('/UsersStatus/:id', controllerUser.updateStatus);
app.put('/UsersPassword/:email', controllerUser.updatePassword);
app.put('/UsersPassword2/:email', controllerUser.updatePassword2);
