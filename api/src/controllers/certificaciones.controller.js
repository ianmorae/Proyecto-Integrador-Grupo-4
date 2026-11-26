const crypto = require('crypto');
const certificaciones = require('../data/certificaciones');

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

function buscarPorId(id) {
  for (let i = 0; i < certificaciones.length; i++) {
    if (certificaciones[i]._id === id) {
      return certificaciones[i];
    }
  }
  return null;
}

function codigoRepetido(codigo) {
  for (let i = 0; i < certificaciones.length; i++) {
    if (certificaciones[i].codigo.toLowerCase() === codigo.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function nombreRepetido(nombre) {
  for (let i = 0; i < certificaciones.length; i++) {
    if (certificaciones[i].nombre.toLowerCase() === nombre.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function listar(req, res) {
  res.json(certificaciones);
}

function obtener(req, res) {
  const certificacion = buscarPorId(req.params.id);
  if (certificacion === null) {
    return res.status(404).json({ mensaje: 'La certificación no existe' });
  }
  res.json(certificacion);
}

function crear(req, res) {
  const datos = req.body || {};
  const error = validar(datos);
  if (error) {
    return res.status(400).json({ mensaje: error });
  }

  const codigo = datos.codigo.trim();
  const nombre = datos.nombre.trim();

  if (codigoRepetido(codigo)) {
    return res.status(409).json({ mensaje: 'Ya existe una certificación con ese código' });
  }

  if (nombreRepetido(nombre)) {
    return res.status(409).json({ mensaje: 'Ya existe una certificación con ese nombre' });
  }

  const certificacion = {
    _id: crypto.randomUUID(),
    codigo: codigo,
    nombre: nombre
  };

  certificaciones.push(certificacion);
  res.status(201).json({ mensaje: 'Certificación guardada.', certificacion: certificacion });
}

module.exports = { listar, obtener, crear };
