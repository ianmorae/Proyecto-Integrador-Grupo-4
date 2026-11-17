// Crea la base de datos del proyecto en MongoDB Atlas.

use('gestion_curricular');

db.createCollection('usuarios');
db.createCollection('roles');
db.createCollection('escuelas');
db.createCollection('carreras');
db.createCollection('casasCertificadoras');
db.createCollection('certificaciones');
db.createCollection('areasSfia');
db.createCollection('tematicas');
db.createCollection('metodologias');
db.createCollection('nivelesComplejidad');
db.createCollection('cursos');
db.createCollection('notificaciones');

// Índices únicos: impiden correos, identificaciones y códigos repetidos
db.usuarios.createIndex({ correoInstitucional: 1 }, { unique: true });
db.usuarios.createIndex({ identificacion: 1 }, { unique: true });
db.roles.createIndex({ nombre: 1 }, { unique: true });
db.escuelas.createIndex({ codigo: 1 }, { unique: true });
db.carreras.createIndex({ codigo: 1 }, { unique: true });
db.casasCertificadoras.createIndex({ codigo: 1 }, { unique: true });
db.certificaciones.createIndex({ codigo: 1 }, { unique: true });
db.areasSfia.createIndex({ codigo: 1 }, { unique: true });
db.tematicas.createIndex({ codigo: 1 }, { unique: true });
db.metodologias.createIndex({ codigo: 1 }, { unique: true });
db.nivelesComplejidad.createIndex({ codigo: 1 }, { unique: true });

// Roles del sistema
db.roles.insertMany([
  { nombre: 'Administrador' },
  { nombre: 'Rectoría' },
  { nombre: 'Vicerrectoría' },
  { nombre: 'Director de Escuela' },
  { nombre: 'Desarrollo Curricular' }
]);

// Muestra las colecciones creadas
db.getCollectionNames();
