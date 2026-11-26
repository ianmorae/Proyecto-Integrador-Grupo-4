// cursos.routes.js: conecta las URL de cursos con su controlador.
const express = require('express');
const controlador = require('../controllers/cursos.controller');

const router = express.Router();

router.get('/', controlador.listar);
router.get('/:id', controlador.obtener);
router.post('/', controlador.crear);

module.exports = router;