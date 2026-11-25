// usuarios.controller.js: recibe las peticiones de /api/v1/usuarios y responde.
const crypto = require('crypto');
const usuarios = require('../data/usuarios');

// Mensaje para cada campo obligatorio.
const OBLIGATORIOS = {
  identificacion: 'Falta la identificación',
  nombre: 'Falta el nombre',
  primerApellido: 'Falta el primer apellido',
  segundoApellido: 'Falta el segundo apellido',
  fechaNacimiento: 'Falta la fecha de nacimiento',
  sexo: 'Falta el sexo',
  correoInstitucional: 'Falta el correo institucional',
  correoPersonal: 'Falta el correo personal',
  celular: 'Falta el celular',
  rol: 'Falta el rol',
  imagen: 'Falta la imagen de perfil'
};

// Revisa los datos recibidos. Devuelve un mensaje de error o null.
function validar(datos) {
  const faltante = Object.keys(OBLIGATORIOS).find(
    (campo) => datos[campo] === undefined || datos[campo] === ''
  );
  if (faltante) {
    return OBLIGATORIOS[faltante];
  }

  if (!datos.correoInstitucional.toLowerCase().endsWith('@ucenfotec.ac.cr')) {
    return 'El correo institucional debe terminar en @ucenfotec.ac.cr';
  }

  if (!/^[0-9]{8}$/.test(datos.celular)) {
    return 'El celular debe tener 8 dígitos';
  }

  return null;
}

// Busca un usuario por su id. Devuelve undefined si no existe.
function buscar(id) {
  return usuarios.find((usuario) => usuario._id === id);
}

// GET /api/v1/usuarios o GET /api/v1/usuarios?rol=Director de Escuela
function listar(req, res) {
  const { rol } = req.query;
  const resultado = rol
    ? usuarios.filter((usuario) => usuario.rol === rol)
    : usuarios;
  res.json(resultado);
}

// GET /api/v1/usuarios/:id
function obtener(req, res) {
  const usuario = buscar(req.params.id);
  if (!usuario) {
    return res.status(404).json({ mensaje: 'El usuario no existe' });
  }
  res.json(usuario);
}

// POST /api/v1/usuarios
function crear(req, res) {
  const error = validar(req.body);
  if (error) {
    return res.status(400).json({ mensaje: error });
  }

  const {
    identificacion, nombre, primerApellido, segundoApellido, fechaNacimiento,
    sexo, correoInstitucional, correoPersonal, celular, rol, imagen
  } = req.body;

  if (usuarios.some((usuario) => usuario.identificacion === identificacion)) {
    return res.status(409).json({ mensaje: 'Ya existe un usuario con esa identificación' });
  }

  if (usuarios.some((usuario) => usuario.correoInstitucional === correoInstitucional)) {
    return res.status(409).json({ mensaje: 'Ya existe un usuario con ese correo institucional' });
  }

  // La contraseña no se guarda todavía: se agregará con bcrypt en el inicio de sesión.
  const usuario = {
    _id: crypto.randomUUID(),
    identificacion,
    nombre,
    primerApellido,
    segundoApellido,
    fechaNacimiento,
    sexo,
    correoInstitucional,
    correoPersonal,
    celular,
    rol,
    imagen,
    estado: 'Activo'
  };

  usuarios.push(usuario);
  res.status(201).json({ mensaje: 'Usuario registrado', usuario });
}

module.exports = { listar, obtener, crear };
