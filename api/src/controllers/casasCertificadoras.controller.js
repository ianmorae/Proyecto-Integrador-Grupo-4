const crypto = require('crypto');
const casas = require('../data/casasCertificadoras');

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

function buscarPorId(id) {
  for (let i = 0; i < casas.length; i++) {
    if (casas[i]._id === id) {
      return casas[i];
    }
  }
  return null;
}

function codigoRepetido(codigo) {
  for (let i = 0; i < casas.length; i++) {
    if (casas[i].codigo === codigo) {
      return true;
    }
  }
  return false;
}

function nombreRepetido(nombre) {
  for (let i = 0; i < casas.length; i++) {
    if (casas[i].nombre.toLowerCase() === nombre.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function listar(req, res) {
  res.json(casas);
}

function obtener(req, res) {
  const casa = buscarPorId(req.params.id);
  if (casa === null) {
    return res.status(404).json({ mensaje: 'La casa certificadora no existe' });
  }
  res.json(casa);
}

function crear(req, res) {
  const datos = req.body || {};
  const error = validar(datos);
  if (error) {
    return res.status(400).json({ mensaje: error });
  }

  const codigo = Number(datos.codigo);
  const nombre = datos.nombre.trim();

  if (codigoRepetido(codigo)) {
    return res.status(409).json({ mensaje: 'Ya existe una casa certificadora con ese código' });
  }

  if (nombreRepetido(nombre)) {
    return res.status(409).json({ mensaje: 'Ya existe una casa certificadora con ese nombre' });
  }

  const casa = {
    _id: crypto.randomUUID(),
    codigo: codigo,
    nombre: nombre
  };

  casas.push(casa);
  res.status(201).json({ mensaje: 'Casa certificadora guardada.', casaCertificadora: casa });
}

module.exports = { listar, obtener, crear };
