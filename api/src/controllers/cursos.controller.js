// cursos.controller.js: recibe las peticiones de /api/v1/cursos y responde.
const crypto = require('crypto');
const cursos = require('../data/cursos');

// Estados que puede tener un curso.
const ESTADOS = ['Borrador', 'En desarrollo', 'Aprobado', 'En producción', 'Inactivo'];

// Revisa los datos recibidos. Devuelve un mensaje de error o null.
// Un borrador solo necesita la escuela, el código (o la casilla de DC) y el nombre oficial.
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

  if (datos.estado && !ESTADOS.includes(datos.estado)) {
    return 'Estado no válido';
  }

  return null;
}

// Busca un curso por su id. Devuelve undefined si no existe.
function buscar(id) {
  return cursos.find((curso) => curso._id === id);
}

// GET /api/v1/cursos
function listar(req, res) {
  res.json(cursos);
}

// GET /api/v1/cursos/:id
function obtener(req, res) {
  const curso = buscar(req.params.id);
  if (!curso) {
    return res.status(404).json({ mensaje: 'El curso no existe' });
  }
  res.json(curso);
}

// POST /api/v1/cursos
function crear(req, res) {
  const error = validar(req.body);
  if (error) {
    return res.status(400).json({ mensaje: error });
  }

  // Solo se toman los campos del esquema de la colección cursos.
  const {
    escuela, codigo, codigoDc, nombreOficial, nombrePowerCampus, ecommerce,
    periodo, estado, areaSfia, tematica, fechaModificacion, creditos, horasClase,
    horasExtraclase, totalHoras, modalidad, nivel, metodologia,
    requisitosIndispensables, requisitosDeseables, programa, moneda,
    certificacion, casaCertificadora, competencia, capacidades, descripcionCorta,
    metaDescripcion, descripcionLarga, perfilIngreso, perfilSalida, palabrasClave,
    metadata, documentoWord, documentoPdf
  } = req.body;

  const codigoLimpio = codigo ? codigo.trim() : '';

  const repetido = cursos.some(
    (curso) => codigoLimpio !== '' && curso.codigo.toLowerCase() === codigoLimpio.toLowerCase()
  );
  if (repetido) {
    return res.status(409).json({ mensaje: 'Ya existe un curso con ese código' });
  }

  const curso = {
    _id: crypto.randomUUID(),
    escuela,
    codigo: codigoLimpio,
    codigoDc: codigoDc === true,
    nombreOficial: nombreOficial.trim(),
    nombrePowerCampus,
    ecommerce,
    periodo,
    estado: estado || 'Borrador',
    areaSfia,
    tematica,
    fechaModificacion,
    creditos,
    horasClase,
    horasExtraclase,
    totalHoras,
    modalidad,
    nivel,
    metodologia,
    requisitosIndispensables,
    requisitosDeseables,
    programa,
    moneda,
    certificacion,
    casaCertificadora,
    competencia,
    capacidades,
    descripcionCorta,
    metaDescripcion,
    descripcionLarga,
    perfilIngreso,
    perfilSalida,
    palabrasClave,
    metadata,
    documentoWord,
    documentoPdf
  };

  cursos.push(curso);
  res.status(201).json({ mensaje: 'Curso registrado correctamente', curso });
}

module.exports = { listar, obtener, crear };
