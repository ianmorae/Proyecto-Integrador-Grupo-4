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

// ===== RF-09: Imagen de perfil =====
function actualizarImagenPerfil(imagen) {
  let avataresPermitidos = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"];

  if (!avataresPermitidos.includes(imagen)) {
    return false;
  }

  let sesion = obtenerSesion();

  if (sesion === null) {
    return false;
  }

  let usuario = buscarPorCorreo(sesion.correo);

  if (usuario === null) {
    return false;
  }

  let usuarios = obtenerUsuarios();

  for (let i = 0; i < usuarios.length; i++) {
    if ( usuarios[i].correoInstitucional.toLowerCase() === sesion.correo.toLowerCase()) {
      usuarios[i].imagen = imagen;
      break;
    }
  }

  guardarUsuarios(usuarios);

  sesion.imagen = imagen;
  guardarSesion(sesion);

  return true;
}