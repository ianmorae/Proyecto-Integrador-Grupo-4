// certificaciones.controller.js: recibe las peticiones de /api/v1/certificaciones y responde.
const crypto = require('crypto');
const certificaciones = require('../data/certificaciones');

// Revisa los datos recibidos. Devuelve un mensaje de error o null.
function validar(datos) {
  if (typeof datos.codigo !== 'string' || datos.codigo.trim() === '') {
    return 'Falta el código';
  }

  if (typeof datos.nombre !== 'string' || datos.nombre.trim() === '') {
    return 'Falta el nombre';
  }

  if (datos.nombre.trim().toLowerCase() === 'no tiene') {
    return 'La opción «No tiene» ya está incluida';
  }

  return null;
}

// Busca una certificación por su id. Devuelve undefined si no existe.
function buscar(id) {
  return certificaciones.find((certificacion) => certificacion._id === id);
}

// GET /api/v1/certificaciones
function listar(req, res) {
  res.json(certificaciones);
}

// GET /api/v1/certificaciones/:id
function obtener(req, res) {
  const certificacion = buscar(req.params.id);
  if (!certificacion) {
    return res.status(404).json({ mensaje: 'La certificación no existe' });
  }
  res.json(certificacion);
}

// POST /api/v1/certificaciones
function crear(req, res) {
  const error = validar(req.body);
  if (error) {
    return res.status(400).json({ mensaje: error });
  }

  const codigo = req.body.codigo.trim();
  const nombre = req.body.nombre.trim();

  if (certificaciones.some((otra) => otra.codigo.toLowerCase() === codigo.toLowerCase())) {
    return res.status(409).json({ mensaje: 'Ya existe una certificación con ese código' });
  }

  if (certificaciones.some((otra) => otra.nombre.toLowerCase() === nombre.toLowerCase())) {
    return res.status(409).json({ mensaje: 'Ya existe una certificación con ese nombre' });
  }

  const certificacion = {
    _id: crypto.randomUUID(),
    codigo,
    nombre
  };

  certificaciones.push(certificacion);
  res.status(201).json({ mensaje: 'Certificación guardada.', certificacion });
}

module.exports = { listar, obtener, crear };
