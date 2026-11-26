const express = require('express');
const controlador = require('../controllers/tematicas.controller');

const router = express.Router();

router.get('/', controlador.listar);
router.get('/:id', controlador.obtener);
router.post('/', controlador.crear);

module.exports = router;
