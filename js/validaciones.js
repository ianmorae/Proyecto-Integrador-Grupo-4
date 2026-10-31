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

function esNumeroEntero(valor) {
  if (valor === "") {
    return false;
  }

  for (let i = 0; i < valor.length; i++) {
    if (valor[i] < "0" || valor[i] > "9") {
      return false;
    }
  }
  return Number(valor) >= 1;
}

function esEnteroNoNegativo(valor) {
  if (valor === "") {
    return false;
  }

  for (let i = 0; i < valor.length; i++) {
    if (valor[i] < "0" || valor[i] > "9") {
      return false;
    }
  }
  return true;
}

function tieneExtension(valor, extensiones) {
  let nombre = valor.toLowerCase();

  for (let i = 0; i < extensiones.length; i++) {
    if (nombre.endsWith(extensiones[i])) {
      return true;
    }
  }
  return false;
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
    return "Ingresa un correo válido.";
  }
  if (id === "contrasenaLogin" && valor === "") {
    return "Ingresa tu contraseña.";
  }
  if (id === "contrasena" && !cumplePolitica(valor)) {
    return "La contraseña debe tener entre 8 y 15 caracteres, con mayúscula, minúscula y número.";
  }
  if (id === "codigoCasa" && valor === "") {
    return "El código es obligatorio.";
  }
  if (id === "codigoCasa" && !esNumeroEntero(valor)) {
    return "El código debe ser un número entero mayor o igual a 1.";
  }
  if (id === "nombreCasa" && valor === "") {
    return "El nombre es obligatorio.";
  }

// Verifica que el código de la escuela no esté vacío.
  if (id === "codigoEscuela" && valor === "") {
    return "El código es obligatorio.";
  }

  // Verifica que el nombre de la escuela no esté vacío.
  if (id === "nombreEscuela" && valor === "") {
    return "El nombre es obligatorio.";
  }

  // Verifica que se haya seleccionado un director.
  if (id === "directorEscuela" && valor === "") {
    return "Selecciona un director.";
  }
  if (id === "escuela" && valor === "") {
    return "Selecciona una escuela.";
  }
  if (id === "codigo" && valor === "" && !document.getElementById("codigoDc").checked) {
    return "El código es obligatorio.";
  }
  if (id === "nombreOficial" && valor === "") {
    return "El nombre oficial es obligatorio.";
  }
  if (id === "nombrePowerCampus" && valor === "") {
    return "El nombre en Power Campus es obligatorio.";
  }
  if (id === "nombrePowerCampus" && valor.length > 40) {
    return "El nombre no puede superar 40 caracteres.";
  }
  if ((id === "periodo" || id === "estado" || id === "tematica" || id === "modalidad" || id === "nivel" || id === "metodologia" || id === "moneda" || id === "certificacion") && valor === "") {
    return "Selecciona una opción.";
  }
  if ((id === "creditos" || id === "horasClase") && !esNumeroEntero(valor)) {
    return "Debe ser un número entero mayor o igual a 1.";
  }
  if (id === "horasExtraclase" && !esEnteroNoNegativo(valor)) {
    return "Debe ser un número entero mayor o igual a 0.";
  }
  if ((id === "requisitosIndispensables" || id === "programa" || id === "competencia" || id === "capacidades" || id === "descripcionLarga" || id === "perfilIngreso" || id === "perfilSalida" || id === "palabrasClave" || id === "metadata") && valor === "") {
    return "Este campo es obligatorio.";
  }
  if (id === "descripcionCorta" && valor === "") {
    return "La descripción corta es obligatoria.";
  }
  if (id === "descripcionCorta" && valor.length > 250) {
    return "El texto supera el límite de 250 caracteres.";
  }
  if (id === "metaDescripcion" && valor === "") {
    return "La meta-descripción es obligatoria.";
  }
  if (id === "metaDescripcion" && valor.length > 155) {
    return "El texto supera el límite de 155 caracteres.";
  }
  if (id === "documentoWord" && valor === "") {
    return "Adjunta el programa en Word.";
  }
  if (id === "documentoWord" && !tieneExtension(valor, [".doc", ".docx"])) {
    return "El archivo debe ser .doc o .docx.";
  }
  if (id === "documentoPdf" && valor === "") {
    return "Adjunta el programa en PDF.";
  }
  if (id === "documentoPdf" && !tieneExtension(valor, [".pdf"])) {
    return "El archivo debe ser .pdf.";
  }
  if (id === "codigoCarrera" && valor === "") {
    return "El código es obligatorio.";
  }
  if (id === "nombreCarrera" && valor === "") {
    return "El nombre es obligatorio.";
  }
  if (id === "escuelaCarrera" && valor === "") {
    return "Selecciona una escuela.";
  }

  if (id === "nombreTematica" && valor === "") {
    return "El nombre es obligatorio.";
  }
  if (id === "nombreMetodologia" && valor === "") {
    return "El nombre es obligatorio.";
  }
  if (id === "descripcionMetodologia" && valor === "") {
    return "La descripción es obligatoria.";
  }
  if (id === "nombreSfia" && valor === "") {
    return "El nombre es obligatorio.";
  }
  if (id === "nombreNivel" && valor === "") {
    return "El nombre es obligatorio.";
  }
  if (id === "tipoNivel" && valor === "") {
    return "Selecciona un nivel.";
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
  if (id === "primerApellidoUsuario" && valor === "") {
    return "El primer apellido es obligatorio.";
  }
  if (id === "segundoApellidoUsuario" && valor === "") {
    return "El segundo apellido es obligatorio.";
  }
  if (id === "identificacionUsuario" && valor === "") {
    return "La identificación es obligatoria.";
  }
  if (id === "correoInstitucional" && !esCorreo(valor)) {
    return "Ingresa un correo institucional válido.";
  }
  if (id === "celularUsuario" && !esCelular(valor)) {
    return "El celular debe tener 8 dígitos.";
  }
  if (id === "correoPersonal" && !esCorreo(valor)) {
    return "Ingresa un correo personal válido.";
  }
  if (id === "fechaNacimiento" && (valor === "" || new Date(valor + "T00:00:00") > new Date())) {
    return "La fecha de nacimiento no es válida.";
  }
  if (id === "sexoUsuario" && valor === "") {
    return "Selecciona una opción.";
  }
  if (id === "rolUsuario" && valor === "") {
    return "Selecciona un rol.";
  }
  if (id === "contrasenaUsuario" && !cumplePolitica(valor)) {
    return "La contraseña debe tener entre 8 y 15 caracteres, con mayúscula, minúscula y número.";
  }
  if (id === "confirmarContrasena" && valor === "") {
    return "Confirma la contraseña.";
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
