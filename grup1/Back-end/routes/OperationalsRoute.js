const app = require('../server');
const controllerOperational = require('../controllers/OperationalsController');
//routes
app.get('/Operationals/', controllerOperational.read);
app.get('/Operationals/:id_operational', controllerOperational.readID);
app.post('/Operationals/', controllerOperational.save);
app.put('/Operationals/:id_operational', controllerOperational.update);
app.delete('/Operationals/:id_operational', controllerOperational.deleteID);
app.get('/OperationalsUsersGet/:id_operational', controllerOperational.GetUserOperational);
app.put('/OperationalsUsersChange/:id_operational',controllerOperational.ChangeUserOperational);
app.get('/OperationalsCandidatesGet/:id_operational', controllerOperational.GetCandidateOperational);
app.put('/OperationalsCandidatesChange/:id_operational',controllerOperational.ChangeCandidateOperational);
app.get('/OperationalsCount/', controllerOperational.countOperational);
app.get('/OperationalsManager/', controllerOperational.readManager);
app.put('/OperationalsState/:id_operational', controllerOperational.updateState);
app.get('/OperationalsTypeManager/', controllerOperational.readTypeGestor);
app.put('/Operational/Photo/',controllerOperational.savePhoto);
