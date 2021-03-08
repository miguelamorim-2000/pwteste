const app = require('../server');
const controllerMaterial = require('../controllers/MaterialsController');
//routes
app.get('/Material/', controllerMaterial.read);