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
  if (id === "codigoCasa" && valor === "") {
    return "El código es obligatorio.";
  }
  if (id === "nombreCasa" && valor === "") {
    return "El nombre es obligatorio.";
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

let camposCasa = ["codigoCasa", "nombreCasa"];
let codigoEditando = "";

function obtenerMonedas() {
  return ["Colones", "Dólares"];
}

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

function buscarCasaPorCodigo(codigo, casas) {
  for (let i = 0; i < casas.length; i++) {
    if (casas[i].codigo.toLowerCase() === codigo.toLowerCase()) {
      return casas[i];
    }
  }
  return null;
}

function quitarEstadoCampo(campo) {
  campo.classList.remove("error", "valido");
  campo.parentElement.querySelector(".mensaje-error").textContent = "";
}

function limpiarFormularioCasa() {
  let formulario = document.getElementById("formCasa");
  let codigo = document.getElementById("codigoCasa");
  let nombre = document.getElementById("nombreCasa");

  formulario.reset();
  codigoEditando = "";
  codigo.readOnly = false;
  quitarEstadoCampo(codigo);
  quitarEstadoCampo(nombre);
  document.getElementById("tituloFormCasa").textContent = "Nueva casa certificadora";
  document.getElementById("btnCancelarCasa").classList.add("oculto");
}

function editarCasa(codigo) {
  let casa = buscarCasaPorCodigo(codigo, obtenerCasas());

  if (casa === null) {
    return;
  }

  let campoCodigo = document.getElementById("codigoCasa");
  let campoNombre = document.getElementById("nombreCasa");

  ocultarMensaje("mensajeCasa");
  quitarEstadoCampo(campoCodigo);
  quitarEstadoCampo(campoNombre);
  codigoEditando = casa.codigo;
  campoCodigo.value = casa.codigo;
  campoCodigo.readOnly = true;
  campoNombre.value = casa.nombre;
  document.getElementById("tituloFormCasa").textContent = "Editar casa certificadora";
  document.getElementById("btnCancelarCasa").classList.remove("oculto");
  campoNombre.focus();
}

function dibujarTablaCasas() {
  let casas = obtenerCasas();
  let cuerpo = document.getElementById("tablaCasas");

  cuerpo.innerHTML = "";

  for (let i = 0; i < casas.length; i++) {
    let fila = document.createElement("tr");
    let celdaCodigo = document.createElement("td");
    let celdaNombre = document.createElement("td");
    let celdaAcciones = document.createElement("td");
    let botonEditar = document.createElement("button");

    celdaCodigo.textContent = casas[i].codigo;
    celdaNombre.textContent = casas[i].nombre;

    botonEditar.type = "button";
    botonEditar.className = "btn-enlace";
    botonEditar.textContent = "Editar";
    botonEditar.addEventListener("click", function () {
      editarCasa(casas[i].codigo);
    });

    celdaAcciones.appendChild(botonEditar);
    fila.appendChild(celdaCodigo);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaAcciones);
    cuerpo.appendChild(fila);
  }

  if (casas.length > 0) {
    document.getElementById("sinCasas").classList.add("oculto");
  } else {
    document.getElementById("sinCasas").classList.remove("oculto");
  }
}

function guardarCasa(evento) {
  evento.preventDefault();
  ocultarMensaje("mensajeCasa");

  if (!validarFormulario(camposCasa)) {
    return;
  }

  let campoCodigo = document.getElementById("codigoCasa");
  let codigo = campoCodigo.value.trim();
  let nombre = document.getElementById("nombreCasa").value.trim();
  let casas = obtenerCasas();

  if (codigoEditando !== "") {
    let existente = buscarCasaPorCodigo(codigoEditando, casas);
    existente.nombre = nombre;
    guardarCasas(casas);
    limpiarFormularioCasa();
    dibujarTablaCasas();
    mostrarMensaje("mensajeCasa", "Casa certificadora actualizada.", "valido");
    return;
  }

  if (buscarCasaPorCodigo(codigo, casas) !== null) {
    mostrarError(campoCodigo, "Ya existe una casa certificadora con ese código.");
    campoCodigo.focus();
    return;
  }

  casas.push({ codigo: codigo, nombre: nombre });
  guardarCasas(casas);
  limpiarFormularioCasa();
  dibujarTablaCasas();
  mostrarMensaje("mensajeCasa", "Casa certificadora guardada.", "valido");
}

function quitarComillas(texto) {
  if (texto.length >= 2 && texto[0] === "\"" && texto[texto.length - 1] === "\"") {
    return texto.slice(1, texto.length - 1).trim();
  }
  return texto;
}

function separarFilaCsv(linea) {
  let coma = linea.indexOf(",");
  let punto = linea.indexOf(";");
  let corte = coma;

  if (corte === -1 || (punto !== -1 && punto < corte)) {
    corte = punto;
  }

  if (corte === -1) {
    return { codigo: quitarComillas(linea.trim()), nombre: "" };
  }
  return {
    codigo: quitarComillas(linea.slice(0, corte).trim()),
    nombre: quitarComillas(linea.slice(corte + 1).trim())
  };
}

function procesarCsvCasas(texto) {
  let lineas = texto.split("\n");
  let casas = obtenerCasas();
  let resultado = { cargados: 0, rechazados: [] };
  let primeraFila = true;

  for (let i = 0; i < lineas.length; i++) {
    let linea = lineas[i].trim();

    if (linea === "") {
      continue;
    }

    let datos = separarFilaCsv(linea);

    if (primeraFila) {
      primeraFila = false;
      if (datos.codigo.toLowerCase() === "codigo" || datos.codigo.toLowerCase() === "código") {
        continue;
      }
    }

    if (datos.codigo === "") {
      resultado.rechazados.push({ fila: i + 1, motivo: "código vacío" });
    } else if (datos.nombre === "") {
      resultado.rechazados.push({ fila: i + 1, motivo: "nombre vacío" });
    } else if (buscarCasaPorCodigo(datos.codigo, casas) !== null) {
      resultado.rechazados.push({ fila: i + 1, motivo: "código duplicado" });
    } else {
      casas.push({ codigo: datos.codigo, nombre: datos.nombre });
      resultado.cargados++;
    }
  }

  guardarCasas(casas);
  return resultado;
}

function mostrarResultadoImportacion(resultado) {
  let lista = document.getElementById("importacionRechazados");

  document.getElementById("importacionCargados").textContent = "✓ " + resultado.cargados + " registros cargados";
  lista.innerHTML = "";

  if (resultado.rechazados.length > 0) {
    let titulo = document.createElement("li");
    titulo.textContent = "✕ " + resultado.rechazados.length + " registros rechazados:";
    lista.appendChild(titulo);
  }

  for (let i = 0; i < resultado.rechazados.length; i++) {
    let item = document.createElement("li");
    item.textContent = "Fila " + resultado.rechazados[i].fila + ": " + resultado.rechazados[i].motivo;
    lista.appendChild(item);
  }

  document.getElementById("resultadoImportacion").classList.remove("oculto");
}

function validarArchivoCsv() {
  let campo = document.getElementById("archivoCsv");

  if (campo.files.length === 0) {
    mostrarError(campo, "Seleccioná un archivo.");
    return false;
  }
  if (campo.files[0].name.toLowerCase().slice(-4) !== ".csv") {
    mostrarError(campo, "El archivo debe tener formato .csv.");
    return false;
  }
  mostrarValido(campo);
  return true;
}

function importarCasas(evento) {
  evento.preventDefault();
  document.getElementById("resultadoImportacion").classList.add("oculto");

  if (!validarArchivoCsv()) {
    return;
  }

  let campo = document.getElementById("archivoCsv");

  let lector = new FileReader();

  lector.onload = function () {
    mostrarResultadoImportacion(procesarCsvCasas(lector.result));
    dibujarTablaCasas();
    campo.value = "";
    quitarEstadoCampo(campo);
  };
  lector.readAsText(campo.files[0], "UTF-8");
}

function dibujarMonedas() {
  let monedas = obtenerMonedas();
  let cuerpo = document.getElementById("tablaMonedas");

  cuerpo.innerHTML = "";

  for (let i = 0; i < monedas.length; i++) {
    let fila = document.createElement("tr");
    let celda = document.createElement("td");

    celda.textContent = monedas[i];
    fila.appendChild(celda);
    cuerpo.appendChild(fila);
  }
}

function mostrarPestana(boton) {
  let botones = document.querySelectorAll(".pestanas button");
  let paneles = document.querySelectorAll(".panel-catalogo");

  for (let i = 0; i < botones.length; i++) {
    if (botones[i] === boton) {
      botones[i].classList.add("pestana-activa");
    } else {
      botones[i].classList.remove("pestana-activa");
    }
  }

  for (let i = 0; i < paneles.length; i++) {
    if (paneles[i].id === boton.getAttribute("data-panel")) {
      paneles[i].classList.remove("oculto");
    } else {
      paneles[i].classList.add("oculto");
    }
  }
}

function iniciarCatalogos() {
  let botones = document.querySelectorAll(".pestanas button");

  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", function () {
      mostrarPestana(botones[i]);
    });
  }

  agregarEventosBlur(camposCasa);

  document.getElementById("formCasa").addEventListener("submit", guardarCasa);
  document.getElementById("btnCancelarCasa").addEventListener("click", limpiarFormularioCasa);
  document.getElementById("formImportar").addEventListener("submit", importarCasas);

  dibujarTablaCasas();
  dibujarMonedas();
}

if (document.getElementById("formCasa") !== null) {
  iniciarCatalogos();
}

// ===== RF-05: Permisos para registrar usuarios =====
function verificarPermisoRegistro() {
  let usuarioActivo = JSON.parse(
    localStorage.getItem("usuarioActivo")
  );

  return Boolean(
    usuarioActivo &&
    (usuarioActivo.rol === "Administrador" || usuarioActivo.rol === "Desarrollo Curricular")
  );
}


/* ===== RF-06: Registro de información del usuario ===== */

let formularioUsuario = document.getElementById("formUsuario");

if (formularioUsuario !== null) {
  let usuarioActivo = JSON.parse(
    localStorage.getItem("usuarioActivo")
  );

  if (!verificarPermisoRegistro()) {
    alert("No tienes permisos para registrar usuarios.");
    window.location.href = "../index.html";
  } else {
    formularioUsuario.addEventListener("submit", function (evento) {
      evento.preventDefault();

      let mensaje = document.getElementById("mensajeUsuario");
      mensaje.classList.add("oculto");
      mensaje.classList.remove("error", "valido");

      let nombre = document.getElementById("nombreUsuario").value.trim();
      let primerApellido = document.getElementById("primerApellido").value.trim();
      let segundoApellido = document.getElementById("segundoApellido").value.trim();
      let identificacion = document.getElementById("identificacionUsuario").value.trim();
      let fechaNacimiento = document.getElementById("fechaNacimiento").value;
      let sexo = document.getElementById("sexoUsuario").value;
      let imagen = document.getElementById("imagenUsuario").value.trim();
      let correoInstitucional = document.getElementById("correoInstitucional").value.trim();
      let correoPersonal = document.getElementById("correoPersonal").value.trim();
      let celular = document.getElementById("celularUsuario").value.trim();
      let rol = document.getElementById("rolUsuario").value;
      let contrasena = document.getElementById("contrasenaUsuario").value;
      let confirmarContrasena = document.getElementById("confirmarContrasena").value;

      function mostrarErrorUsuario(texto) {
        mensaje.textContent = texto;
        mensaje.classList.remove("oculto", "valido");
        mensaje.classList.add("error");
      }

      // Validar los campos obligatorios.
      if (
        nombre === "" ||
        primerApellido === "" ||
        segundoApellido === "" ||
        identificacion === "" ||
        fechaNacimiento === "" ||
        sexo === "" ||
        correoInstitucional === "" ||
        correoPersonal === "" ||
        celular === "" ||
        rol === "" ||
        contrasena === "" ||
        confirmarContrasena === ""
      ) {
        mostrarErrorUsuario("Completa todos los campos obligatorios.");
        return;
      }

      // Validar los correos con la función existente.
      if (
        !esCorreo(correoInstitucional) ||
        !esCorreo(correoPersonal)
      ) {
        mostrarErrorUsuario("Ingresa correos electrónicos válidos.");
        return;
      }

      // Validar la política de contraseña existente.
      if (!cumplePolitica(contrasena)) {
        mostrarErrorUsuario("La contraseña debe tener de 8 a 15 caracteres, " +"con mayúscula, minúscula y número.");
        return;
      }

      // Comprobar que las contraseñas coincidan.
      if (contrasena !== confirmarContrasena) {
        mostrarErrorUsuario("Las contraseñas no coinciden.");
        return;
      }

      // Impedir una fecha de nacimiento futura.
      let hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      let fechaIngresada = new Date(fechaNacimiento + "T00:00:00");

      if (fechaIngresada > hoy) {
        mostrarErrorUsuario("La fecha de nacimiento no puede ser futura.");
        return;
      }

      // Validar la URL de imagen si se ingresó una.
      if (imagen !== "") {
        try {
          let urlImagen = new URL(imagen);

          if (
            urlImagen.protocol !== "https:" &&
            urlImagen.protocol !== "http:"
          ) {
            mostrarErrorUsuario("La URL de imagen debe usar HTTP o HTTPS.");
            return;
          }
        } catch (error) {
          mostrarErrorUsuario("Ingresa una URL de imagen válida.");
          return;
        }
      }

      // Recuperar los usuarios guardados.
      let usuarios = JSON.parse(
        localStorage.getItem("usuarios") || "[]"
      );

      // Evitar identificaciones y correos institucionales duplicados.
      let duplicado = usuarios.some(function (usuario) {
        return (
          usuario.identificacion === identificacion ||
          (
            usuario.correoInstitucional &&usuario.correoInstitucional.toLowerCase() ===
              correoInstitucional.toLowerCase()
          )
        );
      });

      if (duplicado) {
        mostrarErrorUsuario("Ya existe un usuario con esa identificación o correo institucional.");
        return;
      }

      // Crear el objeto del nuevo usuario.
      let nuevoUsuario = {
        nombre: nombre,
        primerApellido: primerApellido,
        segundoApellido: segundoApellido,
        apellidos: primerApellido + " " + segundoApellido,
        identificacion: identificacion,
        fechaNacimiento: fechaNacimiento,
        sexo: sexo,
        imagen: imagen,
        correoInstitucional: correoInstitucional,
        correoPersonal: correoPersonal,
        celular: celular,
        rol: rol,
        contrasena: btoa(contrasena)
      };

      // Guardar el nuevo usuario.
      usuarios.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      // Mostrar la confirmación y limpiar el formulario.
      mensaje.textContent = "Usuario registrado correctamente.";
      mensaje.classList.remove("oculto", "error");
      mensaje.classList.add("valido");

      formularioUsuario.reset();
    });
  }
}
