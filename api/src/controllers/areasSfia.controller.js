// areasSfia.controller.js: recibe las peticiones de /api/v1/areasSfia y responde.
const crypto = require('crypto');
const areasSfia = require('../data/areasSfia');

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

// El código es el más alto del catálogo más uno.
function siguienteCodigo() {
  let mayor = 0;

  for (let i = 0; i < areasSfia.length; i++) {
    if (areasSfia[i].codigo > mayor) {
      mayor = areasSfia[i].codigo;
    }
  }

  return mayor + 1;
}

// GET /api/v1/areasSfia
function listar(req, res) {
  res.json(areasSfia);
}

// POST /api/v1/areasSfia
function crear(req, res) {
  const error = validar(req.body);

  if (error) {
    return res.status(400).json({ mensaje: error });
  }

  const nombre = req.body.nombre.trim();
  const descripcion = req.body.descripcion
    ? req.body.descripcion.trim()
    : '';

  // Comprueba que no exista otra área con el mismo nombre.
  if (areasSfia.some(
    (otra) => otra.nombre.toLowerCase() === nombre.toLowerCase()
  )) {
    return res.status(409).json({
      mensaje: 'Ya existe un área SFIA con ese nombre'
    });
  }

  // Crea el área con un código automático.
  const area = {
    _id: crypto.randomUUID(),
    codigo: siguienteCodigo(),
    nombre,
    descripcion
  };

  areasSfia.push(area);

  res.status(201).json({
    mensaje: 'Área SFIA guardada con el código ' + area.codigo + '.',
    areaSfia: area
  });
}

module.exports = { listar, crear };