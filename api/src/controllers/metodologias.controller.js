const crypto = require('crypto');
const metodologias = require('../data/metodologias');

function validar(datos) {
  if (typeof datos.nombre !== 'string' || datos.nombre.trim() === '') {
    return 'Falta el nombre';
  }

  if (typeof datos.descripcion !== 'string' || datos.descripcion.trim() === '') {
    return 'Falta la descripción';
  }

  return null;
}

function buscarPorId(id) {
  for (let i = 0; i < metodologias.length; i++) {
    if (metodologias[i]._id === id) {
      return metodologias[i];
    }
  }
  return null;
}

function nombreRepetido(nombre) {
  for (let i = 0; i < metodologias.length; i++) {
    if (metodologias[i].nombre.toLowerCase() === nombre.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function siguienteCodigo() {
  let mayor = 0;

  for (let i = 0; i < metodologias.length; i++) {
    if (metodologias[i].codigo > mayor) {
      mayor = metodologias[i].codigo;
    }
  }
  return mayor + 1;
}

function listar(req, res) {
  res.json(metodologias);
}

function obtener(req, res) {
  const metodologia = buscarPorId(req.params.id);
  if (metodologia === null) {
    return res.status(404).json({ mensaje: 'La metodología no existe' });
  }
  res.json(metodologia);
}

function crear(req, res) {
  const datos = req.body || {};
  const error = validar(datos);
  if (error) {
    return res.status(400).json({ mensaje: error });
  }

  const nombre = datos.nombre.trim();
  const descripcion = datos.descripcion.trim();

  if (nombreRepetido(nombre)) {
    return res.status(409).json({ mensaje: 'Ya existe una metodología con ese nombre' });
  }

  const metodologia = {
    _id: crypto.randomUUID(),
    codigo: siguienteCodigo(),
    nombre: nombre,
    descripcion: descripcion
  };

  metodologias.push(metodologia);
  res.status(201).json({ mensaje: 'Metodología guardada con el código ' + metodologia.codigo + '.', metodologia: metodologia });
}

module.exports = { listar, obtener, crear };
