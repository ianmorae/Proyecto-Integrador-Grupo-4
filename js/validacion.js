let camposLogin = ["correoLogin", "contrasenaLogin"];

// ===== Datos iniciales =====
function cargarAdministrador() {
  let usuarios = JSON.parse(localStorage.getItem("usuarios"));

  if (usuarios === null) {
    usuarios = [];
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
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }
}

function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios"));
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

// ===== Funciones de validación =====
function esCorreo(valor) {
  let arroba = valor.indexOf("@");
  let punto = valor.lastIndexOf(".");

  if (valor.includes(" ")) {
    return false;
  }
  return arroba > 0 && punto > arroba + 1 && punto < valor.length - 1;
}

function cumplePolitica(valor) {
  let mayuscula = false;
  let minuscula = false;
  let numero = false;

  if (valor.length < 8 || valor.length > 15) {
    return false;
  }

  for (let i = 0; i < valor.length; i++) {
    let letra = valor[i];

    if (letra >= "A" && letra <= "Z") {
      mayuscula = true;
    } else if (letra >= "a" && letra <= "z") {
      minuscula = true;
    } else if (letra >= "0" && letra <= "9") {
      numero = true;
    } else {
      return false;
    }
  }
  return mayuscula && minuscula && numero;
}

function obtenerMensaje(id, valor) {
  if (id === "correoLogin" && !esCorreo(valor)) {
    return "Ingresá un correo válido.";
  }
  if (id === "contrasenaLogin" && valor === "") {
    return "Ingresá tu contraseña.";
  }
  if (id === "contrasena" && !cumplePolitica(valor)) {
    return "La contraseña debe tener entre 8 y 15 caracteres, con mayúscula, minúscula y número.";
  }
  return "";
}

function mostrarError(campo, mensaje) {
  campo.classList.remove("valido");
  campo.classList.add("error");
  campo.parentElement.querySelector(".mensaje-error").textContent = mensaje;
}

function mostrarValido(campo) {
  campo.classList.remove("error");
  campo.classList.add("valido");
  campo.parentElement.querySelector(".mensaje-error").textContent = "";
}

function validarCampo(campo) {
  let mensaje = obtenerMensaje(campo.id, campo.value.trim());

  if (mensaje !== "") {
    mostrarError(campo, mensaje);
    return false;
  }
  mostrarValido(campo);
  return true;
}

function validarFormulario(ids) {
  let primerError = null;

  for (let i = 0; i < ids.length; i++) {
    let campo = document.getElementById(ids[i]);
    if (!validarCampo(campo) && primerError === null) {
      primerError = campo;
    }
  }

  if (primerError !== null) {
    primerError.focus();
    return false;
  }
  return true;
}

function agregarEventosBlur(ids) {
  for (let i = 0; i < ids.length; i++) {
    let campo = document.getElementById(ids[i]);
    campo.addEventListener("blur", function () {
      validarCampo(campo);
    });
  }
}

function mostrarMensaje(id, texto, tipo) {
  let mensaje = document.getElementById(id);
  mensaje.textContent = texto;
  mensaje.classList.remove("oculto", "error", "valido");
  mensaje.classList.add(tipo);
}

function ocultarMensaje(id) {
  document.getElementById(id).classList.add("oculto");
}

// ===== Inicio de sesión =====
function iniciarSesion(usuario) {
  let sesion = {
    nombre: usuario.nombre,
    apellidos: usuario.apellidos,
    correo: usuario.correoInstitucional,
    rol: usuario.rol
  };
  localStorage.setItem("usuarioActivo", JSON.stringify(sesion));
  window.location.href = "pages/inicio.html";
}

function ingresar(evento) {
  evento.preventDefault();
  ocultarMensaje("mensajeLogin");

  if (!validarFormulario(camposLogin)) {
    return;
  }

  let correo = document.getElementById("correoLogin").value.trim();
  let contrasena = document.getElementById("contrasenaLogin").value;
  let usuario = buscarPorCorreo(correo);

  if (usuario !== null && cumplePolitica(contrasena) && usuario.contrasena === btoa(contrasena)) {
    iniciarSesion(usuario);
  } else {
    mostrarMensaje("mensajeLogin", "Correo o contraseña incorrectos.", "error");
  }
}

// ===== Eventos de cada página =====
if (document.getElementById("formLogin") !== null) {
  cargarAdministrador();
  agregarEventosBlur(camposLogin);
  document.getElementById("formLogin").addEventListener("submit", ingresar);
}
