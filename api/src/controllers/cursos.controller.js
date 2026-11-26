
// cursos.controller.js: recibe las peticiones de /api/v1/cursos y responde.
const crypto = require('crypto');
const cursos = require('../data/cursos');

// Revisa los datos recibidos. Devuelve un mensaje de error o null.
function validar(datos) {
  if (!datos.escuela) {
    return 'Falta la escuela';
  }

  if (!datos.codigoDc && (!datos.codigo || datos.codigo.trim() === '')) {
    return 'Falta el código del curso';
  }

  if (!datos.nombreOficial || datos.nombreOficial.trim() === '') {
    return 'Falta el nombre oficial del curso';
  }

  return null;
}

// GET /api/v1/cursos
function listar(req, res) {
  res.json(cursos);
}

// GET /api/v1/cursos/:id
function obtener(req, res) {
  const curso = cursos.find((curso) => curso._id === req.params.id);

  if (!curso) {
    return res.status(404).json({ mensaje: 'El curso no existe' });
  }

  res.json(curso);
}

// POST /api/v1/cursos
function crear(req, res) {
  const datos = req.body || {};

  const error = validar(datos);

  if (error) {
    return res.status(400).json({ mensaje: error });
  }

  // Comprueba que no exista otro curso con el mismo código.
  if (datos.codigo && cursos.some(
    (curso) => curso.codigo &&
      curso.codigo.toLowerCase() === datos.codigo.trim().toLowerCase()
  )) {
    return res.status(409).json({
      mensaje: 'Ya existe un curso con ese código'
    });
  }

  // Crea el curso con los datos recibidos.
  const curso = {
    _id: crypto.randomUUID(),
    ...datos,
    codigo: datos.codigo ? datos.codigo.trim() : ''
  };

  cursos.push(curso);

  res.status(201).json({
    mensaje: 'Curso registrado correctamente',
    curso
  });
}

module.exports = { listar, obtener, crear };
