// usuarios.js: datos en memoria. Más adelante se reemplazan por MongoDB.
// La contraseña no se incluye: se guardará como hash con bcrypt.
const usuarios = [
  {
    _id: '1',
    identificacion: '1-1111-1111',
    nombre: 'Ana',
    primerApellido: 'Rojas',
    segundoApellido: 'Mora',
    fechaNacimiento: '1995-05-10',
    sexo: 'Femenino',
    correoInstitucional: 'arojas@ucenfotec.ac.cr',
    correoPersonal: 'ana.rojas@gmail.com',
    celular: '88887777',
    rol: 'Director de Escuela',
    imagen: 'A3',
    estado: 'Activo'
  },
  {
    _id: '2',
    identificacion: '2-2222-2222',
    nombre: 'Carlos',
    primerApellido: 'Vargas',
    segundoApellido: 'Solís',
    fechaNacimiento: '1988-09-21',
    sexo: 'Masculino',
    correoInstitucional: 'cvargas@ucenfotec.ac.cr',
    correoPersonal: 'carlos.vargas@gmail.com',
    celular: '87776666',
    rol: 'Desarrollo Curricular',
    imagen: 'A1',
    estado: 'Activo'
  },
  {
    _id: '3',
    identificacion: '3-3333-3333',
    nombre: 'Laura',
    primerApellido: 'Jiménez',
    segundoApellido: 'Castro',
    fechaNacimiento: '1979-02-14',
    sexo: 'Femenino',
    correoInstitucional: 'ljimenez@ucenfotec.ac.cr',
    correoPersonal: 'laura.jimenez@gmail.com',
    celular: '86665555',
    rol: 'Director de Escuela',
    imagen: 'A5',
    estado: 'Inactivo'
  }
];

module.exports = usuarios;
