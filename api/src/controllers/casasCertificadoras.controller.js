// casasCertificadoras.controller.js: recibe las peticiones de /api/v1/casasCertificadoras y responde.
const crypto = require('crypto');
const casas = require('../data/casasCertificadoras');

// Revisa los datos recibidos. Devuelve un mensaje de error o null.
function validar(datos) {
  if (datos.codigo === undefined || datos.codigo === null || datos.codigo === '') {
    return 'Falta el código';
  }

  const codigo = Number(datos.codigo);
  if (!Number.isInteger(codigo) || codigo < 1) {
    return 'El código debe ser un número entero mayor o igual a 1';
  }

  if (typeof datos.nombre !== 'string' || datos.nombre.trim() === '') {
    return 'Falta el nombre';
  }

  return null;
}

// Busca una casa certificadora por su id. Devuelve undefined si no existe.
function buscar(id) {
  return casas.find((casa) => casa._id === id);
}

// GET /api/v1/casasCertificadoras
function listar(req, res) {
  res.json(casas);
}

// GET /api/v1/casasCertificadoras/:id
function obtener(req, res) {
  const casa = buscar(req.params.id);
  if (!casa) {
    return res.status(404).json({ mensaje: 'La casa certificadora no existe' });
  }
  res.json(casa);
}

// POST /api/v1/casasCertificadoras
function crear(req, res) {
  const error = validar(req.body);
  if (error) {
    return res.status(400).json({ mensaje: error });
  }

  const codigo = Number(req.body.codigo);
  const nombre = req.body.nombre.trim();

  if (casas.some((casa) => casa.codigo === codigo)) {
    return res.status(409).json({ mensaje: 'Ya existe una casa certificadora con ese código' });
  }

  if (casas.some((casa) => casa.nombre.toLowerCase() === nombre.toLowerCase())) {
    return res.status(409).json({ mensaje: 'Ya existe una casa certificadora con ese nombre' });
  }

  const casa = {
    _id: crypto.randomUUID(),
    codigo,
    nombre
  };

  casas.push(casa);
  res.status(201).json({ mensaje: 'Casa certificadora guardada.', casaCertificadora: casa });
}

module.exports = { listar, obtener, crear };
