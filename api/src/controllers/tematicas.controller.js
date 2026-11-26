const crypto = require('crypto');
const tematicas = require('../data/tematicas');

function validar(datos) {
  if (typeof datos.nombre !== 'string' || datos.nombre.trim() === '') {
    return 'Falta el nombre';
  }

  if (datos.descripcion !== undefined && typeof datos.descripcion !== 'string') {
    return 'La descripción debe ser texto';
  }

  return null;
}

function buscarPorId(id) {
  for (let i = 0; i < tematicas.length; i++) {
    if (tematicas[i]._id === id) {
      return tematicas[i];
    }
  }
  return null;
}

function nombreRepetido(nombre) {
  for (let i = 0; i < tematicas.length; i++) {
    if (tematicas[i].nombre.toLowerCase() === nombre.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function siguienteCodigo() {
  let mayor = 0;

  for (let i = 0; i < tematicas.length; i++) {
    if (tematicas[i].codigo > mayor) {
      mayor = tematicas[i].codigo;
    }
  }
  return mayor + 1;
}

function listar(req, res) {
  res.json(tematicas);
}

function obtener(req, res) {
  const tematica = buscarPorId(req.params.id);
  if (tematica === null) {
    return res.status(404).json({ mensaje: 'La temática no existe' });
  }
  res.json(tematica);
}

function crear(req, res) {
  const datos = req.body || {};
  const error = validar(datos);
  if (error) {
    return res.status(400).json({ mensaje: error });
  }

  const nombre = datos.nombre.trim();
  let descripcion = '';
  if (datos.descripcion !== undefined) {
    descripcion = datos.descripcion.trim();
  }

  if (nombreRepetido(nombre)) {
    return res.status(409).json({ mensaje: 'Ya existe una temática con ese nombre' });
  }

  const tematica = {
    _id: crypto.randomUUID(),
    codigo: siguienteCodigo(),
    nombre: nombre,
    descripcion: descripcion
  };

  tematicas.push(tematica);
  res.status(201).json({ mensaje: 'Temática guardada con el código ' + tematica.codigo + '.', tematica: tematica });
}

module.exports = { listar, obtener, crear };
