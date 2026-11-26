// tematicas.controller.js: recibe las peticiones de /api/v1/tematicas y responde.
const crypto = require('crypto');
const tematicas = require('../data/tematicas');

// Revisa los datos recibidos. Devuelve un mensaje de error o null.
function validar(datos) {
  if (typeof datos.nombre !== 'string' || datos.nombre.trim() === '') {
    return 'Falta el nombre';
  }

  if (datos.descripcion !== undefined && typeof datos.descripcion !== 'string') {
    return 'La descripción debe ser texto';
  }

  return null;
}

// Busca una temática por su id. Devuelve undefined si no existe.
function buscar(id) {
  return tematicas.find((tematica) => tematica._id === id);
}

// El código es el más alto del catálogo más uno.
function siguienteCodigo() {
  let mayor = 0;

  for (let i = 0; i < tematicas.length; i++) {
    if (tematicas[i].codigo > mayor) {
      mayor = tematicas[i].codigo;
    }
  }
  return mayor + 1;
}

// GET /api/v1/tematicas
function listar(req, res) {
  res.json(tematicas);
}

// GET /api/v1/tematicas/:id
function obtener(req, res) {
  const tematica = buscar(req.params.id);
  if (!tematica) {
    return res.status(404).json({ mensaje: 'La temática no existe' });
  }
  res.json(tematica);
}

// POST /api/v1/tematicas
function crear(req, res) {
  const error = validar(req.body);
  if (error) {
    return res.status(400).json({ mensaje: error });
  }

  const nombre = req.body.nombre.trim();
  const descripcion = req.body.descripcion ? req.body.descripcion.trim() : '';

  if (tematicas.some((otra) => otra.nombre.toLowerCase() === nombre.toLowerCase())) {
    return res.status(409).json({ mensaje: 'Ya existe una temática con ese nombre' });
  }

  const tematica = {
    _id: crypto.randomUUID(),
    codigo: siguienteCodigo(),
    nombre,
    descripcion
  };

  tematicas.push(tematica);
  res.status(201).json({ mensaje: 'Temática guardada con el código ' + tematica.codigo + '.', tematica });
}

module.exports = { listar, obtener, crear };
