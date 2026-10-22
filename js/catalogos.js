// Catálogos (catalogos.html).

let camposCasa = ["codigoCasa", "nombreCasa"];
let codigoEditando = "";

function obtenerMonedas() {
  return ["Colones", "Dólares"];
}

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

  dibujarTablaCasas();
  dibujarMonedas();
}

iniciarCatalogos();

// ===== RF-26: Área SFIA =====
let camposSfia = ["codigoSfia", "nombreSfia"];

function buscarAreaSfia(codigo, areas) {
  for (let i = 0; i < areas.length; i++) {
    if (areas[i].codigo.toLowerCase() === codigo.toLowerCase()) {
      return areas[i];
    }
  }
  return null;
}

function limpiarFormularioSfia() {
  document.getElementById("formSfia").reset();

  for (let i = 0; i < camposSfia.length; i++) {
    quitarEstadoCampo(document.getElementById(camposSfia[i]));
  }
}

function dibujarTablaSfia() {
  let areas = obtenerAreasSfia();
  let tabla = document.getElementById("tablaSfia");
  tabla.innerHTML = "";

  for (let i = 0; i < areas.length; i++) {
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
}

function guardarAreaSfia(evento) {
  evento.preventDefault();
  ocultarMensaje("mensajeSfia");

  if (!validarFormulario(camposSfia)) {
    return;
  }

  let campoCodigo = document.getElementById("codigoSfia");
  let areas = obtenerAreasSfia();

  if (buscarAreaSfia(campoCodigo.value.trim(), areas) !== null) {
    mostrarError(campoCodigo, "Ya existe un área SFIA con ese código.");
    campoCodigo.focus();
    return;
  }

  let area = {
    codigo: campoCodigo.value.trim(),
    nombre: document.getElementById("nombreSfia").value.trim(),
    descripcion: document.getElementById("descripcionSfia").value.trim()
  };

  areas.push(area);
  guardarAreasSfia(areas);

  limpiarFormularioSfia();
  dibujarTablaSfia();
  mostrarMensaje("mensajeSfia", "Área SFIA guardada.", "valido");
}

agregarEventosBlur(camposSfia);
document.getElementById("formSfia").addEventListener("submit", guardarAreaSfia);
dibujarTablaSfia();
