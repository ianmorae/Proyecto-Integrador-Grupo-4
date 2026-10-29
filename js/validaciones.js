// Funciones de validación y mensajes que comparten todos los formularios.

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

function esCelular(valor) {
  if (valor.length !== 8) {
    return false;
  }

  for (let i = 0; i < valor.length; i++) {
    if (valor[i] < "0" || valor[i] > "9") {
      return false;
    }
  }
  return true;
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
  if (id === "codigoCasa" && valor === "") {
    return "El código es obligatorio.";
  }
  if (id === "nombreCasa" && valor === "") {
    return "El nombre es obligatorio.";
  }
  if (id === "nombreSfia" && valor === "") {
    return "El nombre es obligatorio.";
  }
  if (id === "nombreNivel" && valor === "") {
    return "El nombre es obligatorio.";
  }
  if (id === "tipoNivel" && valor === "") {
    return "Seleccioná un nivel.";
  }
  if (id === "descripcionNivel" && valor === "") {
    return "La descripción es obligatoria.";
  }
  if (id === "codigoCertificacion" && valor === "") {
    return "El código es obligatorio.";
  }
  if (id === "nombreCertificacion" && valor === "") {
    return "El nombre es obligatorio.";
  }
  if (id === "nombreUsuario" && valor === "") {
    return "El nombre es obligatorio.";
  }
  if (id === "apellidosUsuario" && valor === "") {
    return "Los apellidos son obligatorios.";
  }
  if (id === "identificacionUsuario" && valor === "") {
    return "La identificación es obligatoria.";
  }
  if (id === "correoInstitucional" && !esCorreo(valor)) {
    return "Ingresá un correo institucional válido.";
  }
  if (id === "celularUsuario" && !esCelular(valor)) {
    return "El celular debe tener 8 dígitos.";
  }
  if (id === "correoPersonal" && !esCorreo(valor)) {
    return "Ingresá un correo personal válido.";
  }
  if (id === "fechaNacimiento" && (valor === "" || new Date(valor + "T00:00:00") > new Date())) {
    return "La fecha de nacimiento no es válida.";
  }
  if (id === "sexoUsuario" && valor === "") {
    return "Seleccioná una opción.";
  }
  if (id === "rolUsuario" && valor === "") {
    return "Seleccioná un rol.";
  }
  if (id === "contrasenaUsuario" && !cumplePolitica(valor)) {
    return "La contraseña debe tener entre 8 y 15 caracteres, con mayúscula, minúscula y número.";
  }
  if (id === "confirmarContrasena" && valor === "") {
    return "Confirmá la contraseña.";
  }
  if (id === "confirmarContrasena" && valor !== document.getElementById("contrasenaUsuario").value) {
    return "Las contraseñas no coinciden.";
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

function quitarEstadoCampo(campo) {
  campo.classList.remove("error", "valido");
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
