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

 // ===== RF-09: Imagen de perfil =====
function actualizarImagenPerfil(imagen) {
  const avataresPermitidos = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"];

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
