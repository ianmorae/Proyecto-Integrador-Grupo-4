// metodologias.routes.js: conecta cada URL de /api/v1/metodologias con su controlador.
const express = require('express');
const controlador = require('../controllers/metodologias.controller');

const router = express.Router();

router.get('/', controlador.listar);
router.get('/:id', controlador.obtener);
router.post('/', controlador.crear);

module.exports = router;
