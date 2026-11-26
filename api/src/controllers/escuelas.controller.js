// escuelas.controller.js: recibe las peticiones de /api/v1/escuelas y responde.
const crypto = require('crypto');
const escuelas = require('../data/escuelas');
const usuarios = require('../data/usuarios');

// Mensaje para cada campo obligatorio.
const OBLIGATORIOS = {
  codigo: 'Falta el código',
  nombre: 'Falta el nombre',
  director: 'Falta el director'
};

// Revisa los datos recibidos. Devuelve un mensaje de error o null.
function validar(datos) {
  const faltante = Object.keys(OBLIGATORIOS).find(
    (campo) => datos[campo] === undefined || datos[campo] === ''
  );
  if (faltante) {
    return OBLIGATORIOS[faltante];
  }

  // El director debe ser un usuario con el rol Director de Escuela.
  const esDirector = usuarios.some(
    (usuario) => usuario.correoInstitucional === datos.director && usuario.rol === 'Director de Escuela'
  );
  if (!esDirector) {
    return 'El director no es un usuario con el rol Director de Escuela';
  }

  return null;
}

// Busca una escuela por su id. Devuelve undefined si no existe.
function buscar(id) {
  return escuelas.find((escuela) => escuela._id === id);
}

// GET /api/v1/escuelas
function listar(req, res) {
  res.json(escuelas);
}

// GET /api/v1/escuelas/:id
function obtener(req, res) {
  const escuela = buscar(req.params.id);
  if (!escuela) {
    return res.status(404).json({ mensaje: 'La escuela no existe' });
  }
  res.json(escuela);
}

// POST /api/v1/escuelas
function crear(req, res) {
  const error = validar(req.body);
  if (error) {
    return res.status(400).json({ mensaje: error });
  }

  const codigo = req.body.codigo.trim();
  const nombre = req.body.nombre.trim();
  const { director } = req.body;

  if (escuelas.some((escuela) => escuela.codigo.toLowerCase() === codigo.toLowerCase())) {
    return res.status(409).json({ mensaje: 'Ya existe una escuela con ese código' });
  }

  const escuela = {
    _id: crypto.randomUUID(),
    codigo,
    nombre,
    director
  };

  escuelas.push(escuela);
  res.status(201).json({ mensaje: 'Escuela registrada', escuela });
}

module.exports = { listar, obtener, crear };
