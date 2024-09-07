var express = require('express');
const multer = require('../middlewares/multer')
const housesController = require('../controllers/housesController');
var router = express.Router();

//ruta para mostrar todas las casaas en venta
router.get('/', housesController.getall);

//ruta para mostrar la edicion de una casa
router.get('/editHouse/:id', housesController.showFormEdit);

//ruta para actualizar los datos de la casa
router.post('/editHouse/:id/:inmoid', multer("casas"), housesController.edit)

//ruta para eliminar definitivamente una casa
router.get('/delete/:id/:inmoid', housesController.delete)

//ruta para hacer un borrado logico de una casa
router.get('/logicDelete/:id', housesController.logicDelete)

module.exports = router;
