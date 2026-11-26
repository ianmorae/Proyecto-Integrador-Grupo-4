// carreras.controller.js: recibe las peticiones de /api/v1/carreras y responde.
const crypto = require('crypto');
const carreras = require('../data/carreras');
const escuelas = require('../data/escuelas');

// Mensaje para cada campo obligatorio.
const OBLIGATORIOS = {
  codigo: 'Falta el código',
  nombre: 'Falta el nombre',
  escuela: 'Falta la escuela'
};

// Revisa los datos recibidos. Devuelve un mensaje de error o null.
function validar(datos) {
  const faltante = Object.keys(OBLIGATORIOS).find(
    (campo) => datos[campo] === undefined || datos[campo] === ''
  );
  if (faltante) {
    return OBLIGATORIOS[faltante];
  }

  // La carrera debe pertenecer a una escuela registrada.
  if (!escuelas.some((escuela) => escuela.codigo === datos.escuela)) {
    return 'La escuela no existe';
  }

  return null;
}

// Busca una carrera por su id. Devuelve undefined si no existe.
function buscar(id) {
  return carreras.find((carrera) => carrera._id === id);
}

// GET /api/v1/carreras o GET /api/v1/carreras?escuela=ESC-01
function listar(req, res) {
  const { escuela } = req.query;
  const resultado = escuela
    ? carreras.filter((carrera) => carrera.escuela === escuela)
    : carreras;
  res.json(resultado);
}

// GET /api/v1/carreras/:id
function obtener(req, res) {
  const carrera = buscar(req.params.id);
  if (!carrera) {
    return res.status(404).json({ mensaje: 'La carrera no existe' });
  }
  res.json(carrera);
}

// POST /api/v1/carreras
function crear(req, res) {
  const error = validar(req.body);
  if (error) {
    return res.status(400).json({ mensaje: error });
  }

  const codigo = req.body.codigo.trim();
  const nombre = req.body.nombre.trim();
  const { escuela } = req.body;

  if (carreras.some((carrera) => carrera.codigo.toLowerCase() === codigo.toLowerCase())) {
    return res.status(409).json({ mensaje: 'Ya existe una carrera con ese código' });
  }

  const carrera = {
    _id: crypto.randomUUID(),
    codigo,
    nombre,
    escuela
  };

  carreras.push(carrera);
  res.status(201).json({ mensaje: 'Carrera registrada', carrera });
}

module.exports = { listar, obtener, crear };
