let camposLogin = ["correoLogin", "contrasenaLogin"];

// ===== Funciones de validación =====
function esCorreo(valor) {
  let arroba = valor.indexOf("@");
  let punto = valor.lastIndexOf(".");

  if (valor.includes(" ")) {
    return false;
  }
  return arroba > 0 && punto > arroba + 1 && punto < valor.length - 1;
}

function obtenerMensaje(id, valor) {
  if (id === "correoLogin" && !esCorreo(valor)) {
    return "Ingresá un correo válido.";
  }
  if (id === "contrasenaLogin" && valor === "") {
    return "Ingresá tu contraseña.";
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

// ===== Inicio de sesión =====
function ingresar(evento) {
  evento.preventDefault();

  if (!validarFormulario(camposLogin)) {
    return;
  }
}

// ===== Eventos de cada página =====
if (document.getElementById("formLogin") !== null) {
  agregarEventosBlur(camposLogin);
  document.getElementById("formLogin").addEventListener("submit", ingresar);
}
