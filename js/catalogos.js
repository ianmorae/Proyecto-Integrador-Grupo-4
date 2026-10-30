// Catálogos (catalogos.html).

let camposCasa = ["codigoCasa", "nombreCasa"];
let codigoEditando = "";

let monedas = ["Colones", "Dólares"];

function buscarCasaPorCodigo(codigo, casas) {
  for (let i = 0; i < casas.length; i++) {
    if (casas[i].codigo.toLowerCase() === codigo.toLowerCase()) {
      return casas[i];
    }
  }
  return null;
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

function coincideCasa(casa, texto) {
  let codigo = String(casa.codigo).toLowerCase();
  let nombre = casa.nombre.toLowerCase();

  return codigo.includes(texto) || nombre.includes(texto);
}

function dibujarTablaCasas() {
  let casas = obtenerCasas();
  let cuerpo = document.getElementById("tablaCasas");
  let texto = document.getElementById("buscarCasa").value.trim().toLowerCase();
  let encontradas = 0;

  cuerpo.innerHTML = "";

  for (let i = 0; i < casas.length; i++) {
    if (!coincideCasa(casas[i], texto)) {
      continue;
    }
    encontradas++;

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

  if (casas.length > 0 && encontradas === 0) {
    document.getElementById("sinResultadosCasas").classList.remove("oculto");
  } else {
    document.getElementById("sinResultadosCasas").classList.add("oculto");
  }
}

function guardarCasa(evento) {
  evento.preventDefault();
  ocultarMensaje("mensajeCasa");

  if (!validarFormulario(camposCasa)) {
    return;
  }

  let campoCodigo = document.getElementById("codigoCasa");
  let codigo = String(Number(campoCodigo.value.trim()));
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

function dibujarMonedas() {
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
  document.getElementById("buscarCasa").addEventListener("input", dibujarTablaCasas);

  dibujarTablaCasas();
  dibujarMonedas();
}

iniciarCatalogos();

// ===== RF-26: Área SFIA =====
let camposSfia = ["nombreSfia"];

// Busca un área por nombre para no repetirla.
function buscarAreaSfia(nombre, areas) {
  for (let i = 0; i < areas.length; i++) {
    if (areas[i].nombre.toLowerCase() === nombre.toLowerCase()) {
      return areas[i];
    }
  }
  return null;
}

// El código es el número más alto registrado más uno.
function siguienteCodigoSfia(areas) {
  let mayor = 0;

  for (let i = 0; i < areas.length; i++) {
    let numero = Number(areas[i].codigo);
    if (numero > mayor) {
      mayor = numero;
    }
  }
  return mayor + 1;
}

function mostrarCodigoSfia() {
  document.getElementById("codigoSfia").value = siguienteCodigoSfia(obtenerAreasSfia());
}

function limpiarFormularioSfia() {
  document.getElementById("formSfia").reset();

  for (let i = 0; i < camposSfia.length; i++) {
    quitarEstadoCampo(document.getElementById(camposSfia[i]));
  }
  mostrarCodigoSfia();
}

// Revisa si el código o el nombre contienen el texto buscado.
function coincideSfia(area, texto) {
  let codigo = String(area.codigo).toLowerCase();
  let nombre = area.nombre.toLowerCase();

  return codigo.includes(texto) || nombre.includes(texto);
}

function dibujarTablaSfia() {
  let areas = obtenerAreasSfia();
  let texto = document.getElementById("buscarSfia").value.trim().toLowerCase();
  let tabla = document.getElementById("tablaSfia");
  let encontradas = 0;
  tabla.innerHTML = "";

  for (let i = 0; i < areas.length; i++) {
    if (!coincideSfia(areas[i], texto)) {
      continue;
    }
    encontradas++;

    let fila = document.createElement("tr");
    let celdaCodigo = document.createElement("td");
    let celdaNombre = document.createElement("td");
    let celdaDescripcion = document.createElement("td");

    celdaCodigo.textContent = areas[i].codigo;
    celdaNombre.textContent = areas[i].nombre;
    celdaDescripcion.textContent = areas[i].descripcion;

    fila.appendChild(celdaCodigo);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaDescripcion);
    tabla.appendChild(fila);
  }

  if (areas.length > 0) {
    document.getElementById("sinSfia").classList.add("oculto");
  } else {
    document.getElementById("sinSfia").classList.remove("oculto");
  }

  // Si hay áreas pero ninguna coincide con la búsqueda, se avisa.
  if (areas.length > 0 && encontradas === 0) {
    document.getElementById("sinResultadosSfia").classList.remove("oculto");
  } else {
    document.getElementById("sinResultadosSfia").classList.add("oculto");
  }
}

function guardarAreaSfia(evento) {
  evento.preventDefault();
  ocultarMensaje("mensajeSfia");

  if (!validarFormulario(camposSfia)) {
    return;
  }

  let campoNombre = document.getElementById("nombreSfia");
  let areas = obtenerAreasSfia();

  if (buscarAreaSfia(campoNombre.value.trim(), areas) !== null) {
    mostrarError(campoNombre, "Ya existe un área SFIA con ese nombre.");
    campoNombre.focus();
    return;
  }

  let area = {
    codigo: siguienteCodigoSfia(areas),
    nombre: campoNombre.value.trim(),
    descripcion: document.getElementById("descripcionSfia").value.trim()
  };

  areas.push(area);
  guardarAreasSfia(areas);

  limpiarFormularioSfia();
  dibujarTablaSfia();
  mostrarMensaje("mensajeSfia", "Área SFIA guardada con el código " + area.codigo + ".", "valido");
}

agregarEventosBlur(camposSfia);
document.getElementById("formSfia").addEventListener("submit", guardarAreaSfia);
document.getElementById("buscarSfia").addEventListener("input", dibujarTablaSfia);
mostrarCodigoSfia();
dibujarTablaSfia();

let camposCertificacion = ["codigoCertificacion", "nombreCertificacion"];
let codigoCertificacionEditando = "";

function buscarCertificacion(codigo, certificaciones) {
  for (let i = 0; i < certificaciones.length; i++) {
    if (certificaciones[i].codigo.toLowerCase() === codigo.toLowerCase()) {
      return certificaciones[i];
    }
  }
  return null;
}

function obtenerOpcionesCertificacion() {
  let certificaciones = obtenerCertificaciones();
  let opciones = ["No tiene"];

  for (let i = 0; i < certificaciones.length; i++) {
    opciones.push(certificaciones[i].nombre);
  }
  return opciones;
}

function limpiarFormularioCertificacion() {
  document.getElementById("formCertificacion").reset();
  codigoCertificacionEditando = "";
  document.getElementById("codigoCertificacion").readOnly = false;
  document.getElementById("tituloFormCertificacion").textContent = "Nueva certificación";
  document.getElementById("btnCancelarCertificacion").classList.add("oculto");

  for (let i = 0; i < camposCertificacion.length; i++) {
    quitarEstadoCampo(document.getElementById(camposCertificacion[i]));
  }
}

function editarCertificacion(codigo) {
  let certificacion = buscarCertificacion(codigo, obtenerCertificaciones());

  if (certificacion === null) {
    return;
  }

  limpiarFormularioCertificacion();
  ocultarMensaje("mensajeCertificacion");
  codigoCertificacionEditando = certificacion.codigo;

  let campoCodigo = document.getElementById("codigoCertificacion");
  let campoNombre = document.getElementById("nombreCertificacion");

  campoCodigo.value = certificacion.codigo;
  campoCodigo.readOnly = true;
  campoNombre.value = certificacion.nombre;
  document.getElementById("tituloFormCertificacion").textContent = "Editar certificación";
  document.getElementById("btnCancelarCertificacion").classList.remove("oculto");
  campoNombre.focus();
}

function dibujarTablaCertificaciones() {
  let certificaciones = obtenerCertificaciones();
  let cuerpo = document.getElementById("tablaCertificaciones");

  cuerpo.innerHTML = "";

  let filaFija = document.createElement("tr");
  let codigoFijo = document.createElement("td");
  let nombreFijo = document.createElement("td");
  let accionesFijo = document.createElement("td");

  codigoFijo.textContent = "—";
  nombreFijo.textContent = "No tiene";
  accionesFijo.textContent = "Opción fija";
  accionesFijo.className = "texto-ayuda";

  filaFija.appendChild(codigoFijo);
  filaFija.appendChild(nombreFijo);
  filaFija.appendChild(accionesFijo);
  cuerpo.appendChild(filaFija);

  for (let i = 0; i < certificaciones.length; i++) {
    let fila = document.createElement("tr");
    let celdaCodigo = document.createElement("td");
    let celdaNombre = document.createElement("td");
    let celdaAcciones = document.createElement("td");
    let botonEditar = document.createElement("button");

    celdaCodigo.textContent = certificaciones[i].codigo;
    celdaNombre.textContent = certificaciones[i].nombre;

    botonEditar.type = "button";
    botonEditar.className = "btn-enlace";
    botonEditar.textContent = "Editar";
    botonEditar.addEventListener("click", function () {
      editarCertificacion(certificaciones[i].codigo);
    });

    celdaAcciones.appendChild(botonEditar);

    fila.appendChild(celdaCodigo);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaAcciones);
    cuerpo.appendChild(fila);
  }
}

function guardarCertificacion(evento) {
  evento.preventDefault();
  ocultarMensaje("mensajeCertificacion");

  if (!validarFormulario(camposCertificacion)) {
    return;
  }

  let campoCodigo = document.getElementById("codigoCertificacion");
  let campoNombre = document.getElementById("nombreCertificacion");
  let codigo = campoCodigo.value.trim();
  let nombre = campoNombre.value.trim();
  let certificaciones = obtenerCertificaciones();

  if (nombre.toLowerCase() === "no tiene") {
    mostrarError(campoNombre, "La opción «No tiene» ya está incluida.");
    campoNombre.focus();
    return;
  }

  if (codigoCertificacionEditando !== "") {
    let existente = buscarCertificacion(codigoCertificacionEditando, certificaciones);
    existente.nombre = nombre;
    guardarCertificaciones(certificaciones);
    limpiarFormularioCertificacion();
    dibujarTablaCertificaciones();
    mostrarMensaje("mensajeCertificacion", "Certificación actualizada.", "valido");
    return;
  }

  if (buscarCertificacion(codigo, certificaciones) !== null) {
    mostrarError(campoCodigo, "Ya existe una certificación con ese código.");
    campoCodigo.focus();
    return;
  }

  certificaciones.push({ codigo: codigo, nombre: nombre });
  guardarCertificaciones(certificaciones);
  limpiarFormularioCertificacion();
  dibujarTablaCertificaciones();
  mostrarMensaje("mensajeCertificacion", "Certificación guardada.", "valido");
}

agregarEventosBlur(camposCertificacion);
document.getElementById("formCertificacion").addEventListener("submit", guardarCertificacion);
document.getElementById("btnCancelarCertificacion").addEventListener("click", limpiarFormularioCertificacion);
dibujarTablaCertificaciones();

// ===== RF-30: Nivel de complejidad =====
let opcionesNivel = ["Básico", "Intermedio", "Avanzado", "Certificación", "Nivel variable"];
let camposNivel = ["nombreNivel", "tipoNivel", "descripcionNivel"];

function cargarOpcionesNivel() {
  let lista = document.getElementById("tipoNivel");

  for (let i = 0; i < opcionesNivel.length; i++) {
    let opcion = document.createElement("option");
    opcion.value = opcionesNivel[i];
    opcion.textContent = opcionesNivel[i];
    lista.appendChild(opcion);
  }
}

// Busca un nivel por nombre para no repetirlo.
function buscarNivel(nombre, niveles) {
  for (let i = 0; i < niveles.length; i++) {
    if (niveles[i].nombre.toLowerCase() === nombre.toLowerCase()) {
      return niveles[i];
    }
  }
  return null;
}

// El código es el número más alto registrado más uno.
function siguienteCodigoNivel(niveles) {
  let mayor = 0;

  for (let i = 0; i < niveles.length; i++) {
    if (niveles[i].codigo > mayor) {
      mayor = niveles[i].codigo;
    }
  }
  return mayor + 1;
}

function mostrarCodigoNivel() {
  document.getElementById("codigoNivel").value = siguienteCodigoNivel(obtenerNiveles());
}

function limpiarFormularioNivel() {
  document.getElementById("formNivel").reset();

  for (let i = 0; i < camposNivel.length; i++) {
    quitarEstadoCampo(document.getElementById(camposNivel[i]));
  }
  mostrarCodigoNivel();
}

// Revisa si el código o el nombre contienen el texto buscado.
function coincideNivel(nivel, texto) {
  let codigo = String(nivel.codigo).toLowerCase();
  let nombre = nivel.nombre.toLowerCase();

  return codigo.includes(texto) || nombre.includes(texto);
}

function dibujarNiveles() {
  let niveles = obtenerNiveles();
  let texto = document.getElementById("buscarNivel").value.trim().toLowerCase();
  let cuerpo = document.getElementById("tablaNiveles");
  let encontrados = 0;

  cuerpo.innerHTML = "";

  for (let i = 0; i < niveles.length; i++) {
    if (!coincideNivel(niveles[i], texto)) {
      continue;
    }
    encontrados++;

    let fila = document.createElement("tr");
    let celdaCodigo = document.createElement("td");
    let celdaNombre = document.createElement("td");
    let celdaNivel = document.createElement("td");
    let celdaDescripcion = document.createElement("td");

    celdaCodigo.textContent = niveles[i].codigo;
    celdaNombre.textContent = niveles[i].nombre;
    celdaNivel.textContent = niveles[i].nivel;
    celdaDescripcion.textContent = niveles[i].descripcion;

    fila.appendChild(celdaCodigo);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaNivel);
    fila.appendChild(celdaDescripcion);
    cuerpo.appendChild(fila);
  }

  if (niveles.length > 0) {
    document.getElementById("sinNiveles").classList.add("oculto");
  } else {
    document.getElementById("sinNiveles").classList.remove("oculto");
  }

  // Si hay niveles pero ninguno coincide con la búsqueda, se avisa.
  if (niveles.length > 0 && encontrados === 0) {
    document.getElementById("sinResultadosNivel").classList.remove("oculto");
  } else {
    document.getElementById("sinResultadosNivel").classList.add("oculto");
  }
}

function guardarNivel(evento) {
  evento.preventDefault();
  ocultarMensaje("mensajeNivel");

  if (!validarFormulario(camposNivel)) {
    return;
  }

  let campoNombre = document.getElementById("nombreNivel");
  let niveles = obtenerNiveles();

  if (buscarNivel(campoNombre.value.trim(), niveles) !== null) {
    mostrarError(campoNombre, "Ya existe un nivel de complejidad con ese nombre.");
    campoNombre.focus();
    return;
  }

  let nivel = {
    codigo: siguienteCodigoNivel(niveles),
    nombre: campoNombre.value.trim(),
    nivel: document.getElementById("tipoNivel").value,
    descripcion: document.getElementById("descripcionNivel").value.trim()
  };

  niveles.push(nivel);
  guardarNiveles(niveles);

  limpiarFormularioNivel();
  dibujarNiveles();
  mostrarMensaje("mensajeNivel", "Nivel de complejidad guardado con el código " + nivel.codigo + ".", "valido");
}

cargarOpcionesNivel();
agregarEventosBlur(camposNivel);
document.getElementById("formNivel").addEventListener("submit", guardarNivel);
document.getElementById("buscarNivel").addEventListener("input", dibujarNiveles);
mostrarCodigoNivel();
dibujarNiveles();

/* ===== RF-28 y RF-29: Catálogos de cursos ===== */

// Configura el formulario y la tabla de cada catálogo.
function configurarCatalogo({
  prefijo,
  obtener,
  guardar,
  descripcionOpcional
}) {
  // Obtiene los elementos HTML del catálogo.
  let formulario = document.getElementById("form" + prefijo);
  let campoCodigo = document.getElementById("codigo" + prefijo);
  let campoNombre = document.getElementById("nombre" + prefijo);
  let campoDescripcion = document.getElementById("descripcion" + prefijo);
  let tabla = document.getElementById("tabla" + (prefijo === "Tematica" ? "Tematicas" : "Metodologias"));
  let mensaje = document.getElementById("mensaje" + prefijo);
  let sinRegistros = document.getElementById("sin" + (prefijo === "Tematica" ? "Tematicas" : "Metodologias"));
  let botonCancelar = document.getElementById("btnCancelar" + prefijo);
  let codigoEditando = "";

  // Limpia el formulario y restablece sus valores.
  function limpiar() {
    formulario.reset();
    codigoEditando = "";
    campoCodigo.readOnly = false;
    botonCancelar.classList.add("oculto");
    ocultarMensaje(mensaje.id);
  }

  // Muestra los registros en la tabla.
  function dibujar() {
    let registros = obtener();
    tabla.innerHTML = "";

    for (let i = 0; i < registros.length; i++) {
      let fila = document.createElement("tr");

      // Agrega los datos de cada registro.
      ["codigo", "nombre", "descripcion"].forEach(function (propiedad) {
        let celda = document.createElement("td");
        celda.textContent = registros[i][propiedad] || "";
        fila.appendChild(celda);
      });

      // Crea el botón para editar.
      let acciones = document.createElement("td");
      let botonEditar = document.createElement("button");
      botonEditar.type = "button";
      botonEditar.className = "btn-enlace";
      botonEditar.textContent = "Editar";

      botonEditar.addEventListener("click", function () {
        // Carga los datos del registro seleccionado.
        codigoEditando = registros[i].codigo;
        campoCodigo.value = registros[i].codigo;
        campoCodigo.readOnly = true;
        campoNombre.value = registros[i].nombre;
        campoDescripcion.value = registros[i].descripcion || "";
        botonCancelar.classList.remove("oculto");
        formulario.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      acciones.appendChild(botonEditar);
      fila.appendChild(acciones);
      tabla.appendChild(fila);
    }

    // Oculta el aviso si existen registros.
    sinRegistros.classList.toggle("oculto", registros.length > 0);
  }

  // Procesa el envío del formulario.
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    ocultarMensaje(mensaje.id);

    let codigo = campoCodigo.value.trim();
    let nombre = campoNombre.value.trim();
    let descripcion = campoDescripcion.value.trim();

    // Comprueba que los campos obligatorios estén completos.
    if (
      codigo === "" ||
      nombre === "" ||
      (!descripcionOpcional && descripcion === "")
    ) {
      mostrarMensaje(
        mensaje.id,
        "Completa los campos obligatorios.",
        "error"
      );
      return;
    }

    let registros = obtener();

    // Comprueba que el código no esté repetido.
    let duplicado = registros.some(function (registro) {
      return registro.codigo.toLowerCase() === codigo.toLowerCase() &&
        registro.codigo !== codigoEditando;
    });

    if (duplicado) {
      mostrarMensaje(
        mensaje.id,
        "Ya existe un registro con ese código.",
        "error"
      );
      campoCodigo.focus();
      return;
    }

    // Crea el objeto con los datos ingresados.
    let registro = {
      codigo: codigo,
      nombre: nombre,
      descripcion: descripcion
    };

    // Modifica el registro o agrega uno nuevo.
    if (codigoEditando !== "") {
      registros = registros.map(function (actual) {
        return actual.codigo === codigoEditando ? registro : actual;
      });
    } else {
      registros.push(registro);
    }

    // Guarda los datos y actualiza la tabla.
    guardar(registros);
    limpiar();
    dibujar();

    // Informa que el registro se guardó correctamente.
    mostrarMensaje(
      mensaje.id,
      "Registro guardado correctamente.",
      "valido"
    );
  });

  // Permite cancelar la edición.
  botonCancelar.addEventListener("click", limpiar);
  dibujar();
}

// Configura el catálogo de temáticas.
configurarCatalogo({
  prefijo: "Tematica",
  obtener: obtenerTematicas,
  guardar: guardarTematicas,
  descripcionOpcional: true
});

// Configura el catálogo de metodologías.
configurarCatalogo({
  prefijo: "Metodologia",
  obtener: obtenerMetodologias,
  guardar: guardarMetodologias,
  descripcionOpcional: false
});

// ===== Escuelas =====

// Lista de campos que se validan en el formulario de escuelas.
let camposEscuela = ["codigoEscuela", "nombreEscuela", "directorEscuela"];

// Llena la lista con los usuarios que tienen el rol Director de Escuela.
function cargarDirectores() {
  // Obtiene la lista de directores y los usuarios registrados.
  let lista = document.getElementById("directorEscuela");
  let usuarios = obtenerUsuarios();

  // Recorre los usuarios registrados.
  for (let i = 0; i < usuarios.length; i++) {

    // Verifica si el usuario tiene el rol Director de Escuela.
    if (usuarios[i].rol === "Director de Escuela") {
      let opcion = document.createElement("option");

      // Asigna el correo como valor y el nombre como texto visible.
      opcion.value = usuarios[i].correoInstitucional;
      opcion.textContent = usuarios[i].nombre + " " + usuarios[i].apellidos;

      // Agrega el director a la lista.
      lista.appendChild(opcion);
    }
  }
}

// Busca una escuela por su código.
function buscarEscuelaPorCodigo(codigo, escuelas) {
  // Recorre las escuelas registradas.
  for (let i = 0; i < escuelas.length; i++) {

    // Compara los códigos sin distinguir mayúsculas y minúsculas.
    if (escuelas[i].codigo.toLowerCase() === codigo.toLowerCase()) {
      return escuelas[i];
    }
  }

  // Devuelve null si no encuentra la escuela.
  return null;
}

// Devuelve el nombre del director a partir de su correo.
function nombreDirector(correo) {
  // Busca al usuario por su correo institucional.
  let usuario = buscarPorCorreo(correo);

  // Si no encuentra al usuario, devuelve el correo.
  if (usuario === null) {
    return correo;
  }

  // Devuelve el nombre completo del director.
  return usuario.nombre + " " + usuario.apellidos;
}

// Muestra las escuelas registradas en la tabla.
function dibujarTablaEscuelas() {
  // Obtiene las escuelas guardadas y el cuerpo de la tabla.
  let escuelas = obtenerEscuelas();
  let cuerpo = document.getElementById("tablaEscuelas");

  // Limpia la tabla antes de agregar los datos.
  cuerpo.innerHTML = "";

  // Recorre las escuelas registradas.
  for (let i = 0; i < escuelas.length; i++) {
    // Crea una fila y sus tres celdas.
    let fila = document.createElement("tr");
    let celdaCodigo = document.createElement("td");
    let celdaNombre = document.createElement("td");
    let celdaDirector = document.createElement("td");

    // Asigna los datos de cada escuela a las celdas.
    celdaCodigo.textContent = escuelas[i].codigo;
    celdaNombre.textContent = escuelas[i].nombre;
    celdaDirector.textContent = nombreDirector(escuelas[i].director);

    // Agrega las celdas a la fila.
    fila.appendChild(celdaCodigo);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaDirector);

    // Agrega la fila a la tabla.
    cuerpo.appendChild(fila);
  }

  // Oculta o muestra el mensaje según existan escuelas registradas.
  if (escuelas.length > 0) {
    document.getElementById("sinEscuelas").classList.add("oculto");
  } else {
    document.getElementById("sinEscuelas").classList.remove("oculto");
  }
}

// Limpia el formulario y los estados de validación.
function limpiarFormularioEscuela() {
  document.getElementById("formEscuela").reset();

  // Quita los estados de los campos.
  for (let i = 0; i < camposEscuela.length; i++) {
    quitarEstadoCampo(document.getElementById(camposEscuela[i]));
  }
}

// Guarda una nueva escuela.
function guardarEscuela(evento) {
  // Evita que se recargue la página al enviar el formulario.
  evento.preventDefault();

  // Oculta los mensajes anteriores.
  ocultarMensaje("mensajeEscuela");

  // Verifica que los campos sean válidos.
  if (!validarFormulario(camposEscuela)) {
    return;
  }

  // Obtiene el código ingresado y las escuelas registradas.
  let campoCodigo = document.getElementById("codigoEscuela");
  let escuelas = obtenerEscuelas();

  // Verifica que no exista otra escuela con el mismo código.
  if (buscarEscuelaPorCodigo(campoCodigo.value.trim(), escuelas) !== null) {
    mostrarError(campoCodigo, "Ya existe una escuela con ese código.");
    campoCodigo.focus();
    return;
  }

  // Agrega la nueva escuela a la lista.
  escuelas.push({
    codigo: campoCodigo.value.trim(),
    nombre: document.getElementById("nombreEscuela").value.trim(),
    director: document.getElementById("directorEscuela").value
  });

  // Guarda las escuelas actualizadas.
  guardarEscuelas(escuelas);

  // Limpia el formulario y muestra un mensaje de éxito.
  limpiarFormularioEscuela();
  mostrarMensaje("mensajeEscuela", "Escuela guardada.", "valido");
}

// Agrega la validación cuando se sale de cada campo.
agregarEventosBlur(camposEscuela);

// Ejecuta la función al enviar el formulario.
document.getElementById("formEscuela").addEventListener("submit", guardarEscuela);

// Carga los directores disponibles al iniciar.
cargarDirectores();