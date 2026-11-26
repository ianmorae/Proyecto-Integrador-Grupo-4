// areasSfia.routes.js: conecta cada URL de /api/v1/areasSfia con su controlador.
const express = require('express');
const controlador = require('../controllers/areasSfia.controller');

const router = express.Router();

router.get('/', controlador.listar);
router.post('/', controlador.crear);

module.exports = router;