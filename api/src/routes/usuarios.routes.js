// usuarios.routes.js: conecta cada URL de /api/v1/usuarios con su controlador.
const express = require('express');
const controlador = require('../controllers/usuarios.controller');

const router = express.Router();

router.get('/', controlador.listar);
router.get('/:id', controlador.obtener);
router.post('/', controlador.crear);
router.put('/:id', controlador.actualizar);
router.patch('/:id/estado', controlador.cambiarEstado);

module.exports = router;
