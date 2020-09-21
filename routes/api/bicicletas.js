var express = require('express');
var router= express.Router();
var BicicletaController=require('../../controllers/api/bicicletaControllerAPI')

router.get('/',BicicletaController.bicicleta_list);
router.post('/create',BicicletaController.bicicleta_create);
router.delete('/delete',BicicletaController.bicicleta_delete);
router.post('/update',BicicletaController.bicicleta_update);
module.exports=router;