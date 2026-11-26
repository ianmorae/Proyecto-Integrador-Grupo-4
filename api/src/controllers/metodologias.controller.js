// metodologias.controller.js: recibe las peticiones de /api/v1/metodologias y responde.
const crypto = require('crypto');
const metodologias = require('../data/metodologias');

// Revisa los datos recibidos. Devuelve un mensaje de error o null.
function validar(datos) {
  if (typeof datos.nombre !== 'string' || datos.nombre.trim() === '') {
    return 'Falta el nombre';
  }

  if (typeof datos.descripcion !== 'string' || datos.descripcion.trim() === '') {
    return 'Falta la descripción';
  }

  return null;
}

// Busca una metodología por su id. Devuelve undefined si no existe.
function buscar(id) {
  return metodologias.find((metodologia) => metodologia._id === id);
}

// El código es el más alto del catálogo más uno.
function siguienteCodigo() {
  let mayor = 0;

  for (let i = 0; i < metodologias.length; i++) {
    if (metodologias[i].codigo > mayor) {
      mayor = metodologias[i].codigo;
    }
  }
  return mayor + 1;
}

// GET /api/v1/metodologias
function listar(req, res) {
  res.json(metodologias);
}

// GET /api/v1/metodologias/:id
function obtener(req, res) {
  const metodologia = buscar(req.params.id);
  if (!metodologia) {
    return res.status(404).json({ mensaje: 'La metodología no existe' });
  }
  res.json(metodologia);
}

// POST /api/v1/metodologias
function crear(req, res) {
  const error = validar(req.body);
  if (error) {
    return res.status(400).json({ mensaje: error });
  }

  const nombre = req.body.nombre.trim();
  const descripcion = req.body.descripcion.trim();

  if (metodologias.some((otra) => otra.nombre.toLowerCase() === nombre.toLowerCase())) {
    return res.status(409).json({ mensaje: 'Ya existe una metodología con ese nombre' });
  }

  const metodologia = {
    _id: crypto.randomUUID(),
    codigo: siguienteCodigo(),
    nombre,
    descripcion
  };

  metodologias.push(metodologia);
  res.status(201).json({ mensaje: 'Metodología guardada con el código ' + metodologia.codigo + '.', metodologia });
}

module.exports = { listar, obtener, crear };
