var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController')
const multer = require('../middlewares/multer');

//localhost:4000  (inmobiliarias)
router.get('/', indexController.viewHome);

//muestra la pagina del form para agregar inmboliarias
router.get('/addinm', indexController.showFormCreateInm);

//post del form para crear inmboliarias
router.post('/addinm', multer('inmobiliaria'), indexController.createinm)

//ruta que me lleva a datos inmboliaria
router.get('/oneinm/:id', indexController.showOneInm)

//ruta que me lleva a añadir una casa 
router.get('/oneinm/:id/addhouse', indexController.showAddHouse)

//ruta para enviar datos de la casa
router.post('/oneinm/:id', multer('casas'), indexController.createHouse)





module.exports = router;
