// Funciones que leen y guardan datos en Local Storage.

// ===== Usuarios =====
function obtenerUsuarios() {
  let usuarios = JSON.parse(localStorage.getItem("usuarios"));

  if (usuarios === null) {
    return [];
  }
  return usuarios;
}

function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function cargarAdministrador() {
  if (localStorage.getItem("usuarios") === null) {
    let usuarios = [];
    let admin = {
      nombre: "Admin",
      apellidos: "Sistema",
      identificacion: "1-0000-0000",
      correoInstitucional: "admin@ucenfotec.ac.cr",
      celular: "88888888",
      correoPersonal: "admin@correo.com",
      fechaNacimiento: "1990-01-01",
      sexo: "Prefiere no decirlo",
      rol: "Administrador",
      contrasena: btoa("Admin2026")
    };
    usuarios.push(admin);
    guardarUsuarios(usuarios);
  }
}

function buscarPorCorreo(correo) {
  let usuarios = obtenerUsuarios();

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].correoInstitucional.toLowerCase() === correo.toLowerCase()) {
      return usuarios[i];
    }
  }
  return null;
}

// ===== Sesión =====
function obtenerSesion() {
  return JSON.parse(localStorage.getItem("usuarioActivo"));
}

function guardarSesion(sesion) {
  localStorage.setItem("usuarioActivo", JSON.stringify(sesion));
}

// Cierra la sesión borrando el usuario activo.
function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
}

// ===== Casas certificadoras =====
function obtenerCasas() {
  let casas = JSON.parse(localStorage.getItem("casasCertificadoras"));

  if (casas === null) {
    return [];
  }
  return casas;
}

function guardarCasas(casas) {
  localStorage.setItem("casasCertificadoras", JSON.stringify(casas));
}

// ===== RF-23: Escuelas =====

// Obtiene las escuelas guardadas en localStorage.
function obtenerEscuelas() {
  // Recupera las escuelas almacenadas.
  let escuelas = JSON.parse(localStorage.getItem("escuelas"));

  // Si no hay escuelas guardadas, devuelve una lista vacía.
  if (escuelas === null) {
    return [];
  }

  return escuelas;
}

// Guarda las escuelas en localStorage.
function guardarEscuelas(escuelas) {
  // Convierte las escuelas a formato JSON para almacenarlas.
  localStorage.setItem("escuelas", JSON.stringify(escuelas));
}

// ===== Áreas SFIA =====
function obtenerAreasSfia() {
  let areas = JSON.parse(localStorage.getItem("areasSfia"));

  if (areas === null) {
    return [];
  }
  return areas;
}

function guardarAreasSfia(areas) {
  localStorage.setItem("areasSfia", JSON.stringify(areas));
}

// ===== RF-30: Niveles de complejidad =====
// La primera vez se cargan los cinco niveles del curso.
function obtenerNiveles() {
  let niveles = JSON.parse(localStorage.getItem("nivelesComplejidad"));

  if (niveles === null) {
    niveles = [
      { codigo: 1, nombre: "Básico", nivel: "Básico", descripcion: "Curso introductorio, no requiere conocimientos previos." },
      { codigo: 2, nombre: "Intermedio", nivel: "Intermedio", descripcion: "Requiere conocimientos básicos del tema." },
      { codigo: 3, nombre: "Avanzado", nivel: "Avanzado", descripcion: "Profundiza en temas especializados." },
      { codigo: 4, nombre: "Certificación", nivel: "Certificación", descripcion: "Prepara para la certificación de una casa certificadora." },
      { codigo: 5, nombre: "Nivel variable", nivel: "Nivel variable", descripcion: "El nivel se ajusta al perfil de los participantes." }
    ];
    guardarNiveles(niveles);
  }
  return niveles;
}

function guardarNiveles(niveles) {
  localStorage.setItem("nivelesComplejidad", JSON.stringify(niveles));
}

// ===== RF-28: Catálogo de temáticas =====

// Obtiene las temáticas almacenadas en localStorage.
function obtenerTematicas() {
  let tematicas = JSON.parse(localStorage.getItem("tematicas"));

  // Si no existen temáticas guardadas, devuelve una lista vacía.
  if (tematicas === null) {
    return [];
  }

  return tematicas;
}

// Guarda las temáticas en localStorage en formato JSON.
function guardarTematicas(tematicas) {
  localStorage.setItem("tematicas", JSON.stringify(tematicas));
}

// ===== RF-29: Catálogo de metodologías =====

// Obtiene las metodologías almacenadas en localStorage.
function obtenerMetodologias() {
  let metodologias = JSON.parse(
    localStorage.getItem("metodologias")
  );

  // Si no existen metodologías guardadas, devuelve una lista vacía.
  if (metodologias === null) {
    return [];
  }

  return metodologias;
}

// Guarda las metodologías en localStorage en formato JSON.
function guardarMetodologias(metodologias) {
  localStorage.setItem(
    "metodologias",
    JSON.stringify(metodologias)
  );
}

 // ===== RF-09, RF-10: Imagen de perfil =====
function actualizarImagenPerfil(imagen) {
  const avataresPermitidos = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"];

  if (!avataresPermitidos.includes(imagen)) {
    return false;
  }

  const sesion = obtenerSesion();

  if (sesion === null || !sesion.correo) {
    return false;
  }

  const usuarios = obtenerUsuarios();
  let encontrado = false;

  for (let i = 0; i < usuarios.length; i++) {
    if (
      usuarios[i].correoInstitucional &&
      usuarios[i].correoInstitucional.toLowerCase() ===
      sesion.correo.toLowerCase()
    ) {
      usuarios[i].imagen = imagen;
      encontrado = true;
      break;
    }
  }

  if (!encontrado) {
    return false;
  }

  guardarUsuarios(usuarios);

  sesion.imagen = imagen;
  guardarSesion(sesion);

  return true;
}

function obtenerCertificaciones() {
  let certificaciones = JSON.parse(localStorage.getItem("certificaciones"));

  if (certificaciones === null) {
    return [];
  }
  return certificaciones;
}

function guardarCertificaciones(certificaciones) {
  localStorage.setItem("certificaciones", JSON.stringify(certificaciones));
}

function obtenerCarreras() {
  let carreras = JSON.parse(localStorage.getItem("carreras"));

  if (carreras === null) {
    return [];
  }
  return carreras;
}

function guardarCarreras(carreras) {
  localStorage.setItem("carreras", JSON.stringify(carreras));
}

let monedas = ["Colones", "Dólares"];

function obtenerCursos() {
  let cursos = JSON.parse(localStorage.getItem("cursos"));

  if (cursos === null) {
    return [];
  }
  return cursos;
}

function guardarCursos(cursos) {
  localStorage.setItem("cursos", JSON.stringify(cursos));
}
