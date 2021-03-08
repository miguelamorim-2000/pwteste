const app = require('../server');
const controllerDenouncer = require('../controllers/DenouncersController');
//routes
app.get('/Denouncers/', controllerDenouncer.read);
app.get('/Denouncers/:id_denouncer', controllerDenouncer.readID);
app.post('/Denouncers/', controllerDenouncer.save);
app.put('/Denouncers/:id_denouncer', controllerDenouncer.update);
app.delete('/Denouncers/:id_denouncer', controllerDenouncer.deleteID);
app.get('/DenouncersUserGet/:id_denouncer', controllerDenouncer.GetUserDenouncer);
app.put('/DenouncersUserChange/:id_denouncer',controllerDenouncer.ChangeUserDenouncer);
app.get('/readCC/:cc_Denouncer', controllerDenouncer.readCC);
app.post('/Denouncers/passport/', controllerDenouncer.saveID);
app.post('/Denouncers/photo', controllerDenouncer.savePhoto);
app.get('/Denouncers/Read/Photo/', controllerDenouncer.readPhoto);