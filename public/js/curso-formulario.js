let estadosCurso = ["Borrador", "En desarrollo", "Aprobado", "En producción", "Inactivo"];
let modalidadesCurso = ["Virtual", "En vivo", "Presencial", "Híbrida"];
let periodosCurso = ["I cuatrimestre", "II cuatrimestre", "III cuatrimestre"];

let camposBorrador = ["escuela", "codigo", "nombreOficial"];
let camposCurso = [
  "escuela", "codigo", "nombreOficial", "nombrePowerCampus", "periodo", "estado", "tematica",
  "creditos", "horasClase", "horasExtraclase", "modalidad", "nivel", "metodologia",
  "requisitosIndispensables", "programa", "moneda", "certificacion",
  "competencia", "capacidades", "descripcionCorta", "metaDescripcion", "descripcionLarga",
  "perfilIngreso", "perfilSalida", "palabrasClave", "metadata", "documentoWord", "documentoPdf"
];

function agregarOpciones(id, registros, propiedadValor, propiedadTexto) {
  let lista = document.getElementById(id);

  for (let i = 0; i < registros.length; i++) {
    let opcion = document.createElement("option");
    opcion.value = registros[i][propiedadValor];
    opcion.textContent = registros[i][propiedadTexto];
    lista.appendChild(opcion);
  }
}

function agregarOpcionesFijas(id, valores) {
  let lista = document.getElementById(id);

  for (let i = 0; i < valores.length; i++) {
    let opcion = document.createElement("option");
    opcion.value = valores[i];
    opcion.textContent = valores[i];
    lista.appendChild(opcion);
  }
}

function cargarListasCurso() {
  agregarOpciones("escuela", obtenerEscuelas(), "codigo", "nombre");
  agregarOpciones("areaSfia", obtenerAreasSfia(), "codigo", "nombre");
  agregarOpciones("tematica", obtenerTematicas(), "codigo", "nombre");
  agregarOpciones("nivel", obtenerNiveles(), "codigo", "nombre");
  agregarOpciones("metodologia", obtenerMetodologias(), "codigo", "nombre");
  agregarOpciones("casaCertificadora", obtenerCasas(), "codigo", "nombre");
  agregarOpcionesFijas("certificacion", ["No tiene"]);
  agregarOpciones("certificacion", obtenerCertificaciones(), "codigo", "nombre");
  agregarOpcionesFijas("estado", estadosCurso);
  agregarOpcionesFijas("modalidad", modalidadesCurso);
  agregarOpcionesFijas("periodo", periodosCurso);
  agregarOpcionesFijas("moneda", monedas);
}

function fechaDeHoy() {
  let hoy = new Date();
  let dia = String(hoy.getDate()).padStart(2, "0");
  let mes = String(hoy.getMonth() + 1).padStart(2, "0");

  return dia + "/" + mes + "/" + hoy.getFullYear();
}

function actualizarContador(idCampo, idContador, limite) {
  let largo = document.getElementById(idCampo).value.length;
  let contador = document.getElementById(idContador);

  contador.textContent = largo + " / " + limite;

  if (largo > limite) {
    contador.classList.add("excedido");
  } else {
    contador.classList.remove("excedido");
  }
}

function actualizarContadores() {
  actualizarContador("nombrePowerCampus", "contadorPowerCampus", 40);
  actualizarContador("descripcionCorta", "contadorDescripcionCorta", 250);
  actualizarContador("metaDescripcion", "contadorMetaDescripcion", 155);
}

function calcularTotalHoras() {
  let clase = document.getElementById("horasClase").value;
  let extraclase = document.getElementById("horasExtraclase").value;
  let total = document.getElementById("totalHoras");

  if (esNumeroEntero(clase) && esEnteroNoNegativo(extraclase)) {
    total.value = Number(clase) + Number(extraclase);
  } else {
    total.value = "";
  }
}

function cambiarCodigoDc() {
  let campoCodigo = document.getElementById("codigo");

  if (document.getElementById("codigoDc").checked) {
    campoCodigo.value = "";
    campoCodigo.readOnly = true;
    quitarEstadoCampo(campoCodigo);
  } else {
    campoCodigo.readOnly = false;
  }
}

function cambiarCertificacion() {
  let casa = document.getElementById("casaCertificadora");

  if (document.getElementById("certificacion").value === "No tiene") {
    casa.value = "";
    casa.disabled = true;
  } else {
    casa.disabled = false;
  }
}

function nombreArchivo(id) {
  let archivos = document.getElementById(id).files;

  if (archivos.length === 0) {
    return "";
  }
  return archivos[0].name;
}

function valorCampo(id) {
  return document.getElementById(id).value.trim();
}

function numeroCampo(id) {
  let valor = valorCampo(id);

  if (valor === "") {
    return "";
  }
  return Number(valor);
}

function codigoRepetido(codigo) {
  let cursos = obtenerCursos();

  for (let i = 0; i < cursos.length; i++) {
    if (codigo !== "" && cursos[i].codigo.toLowerCase() === codigo.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function crearCurso(estadoPorDefecto) {
  let estado = valorCampo("estado");

  if (estado === "") {
    estado = estadoPorDefecto;
  }

  return {
    escuela: valorCampo("escuela"),
    codigo: valorCampo("codigo"),
    codigoDc: document.getElementById("codigoDc").checked,
    nombreOficial: valorCampo("nombreOficial"),
    nombrePowerCampus: valorCampo("nombrePowerCampus"),
    ecommerce: document.querySelector('input[name="ecommerce"]:checked').value,
    periodo: valorCampo("periodo"),
    estado: estado,
    areaSfia: valorCampo("areaSfia"),
    tematica: valorCampo("tematica"),
    fechaModificacion: fechaDeHoy(),
    creditos: numeroCampo("creditos"),
    horasClase: numeroCampo("horasClase"),
    horasExtraclase: numeroCampo("horasExtraclase"),
    totalHoras: numeroCampo("totalHoras"),
    modalidad: valorCampo("modalidad"),
    nivel: valorCampo("nivel"),
    metodologia: valorCampo("metodologia"),
    requisitosIndispensables: valorCampo("requisitosIndispensables"),
    requisitosDeseables: valorCampo("requisitosDeseables"),
    programa: valorCampo("programa"),
    moneda: valorCampo("moneda"),
    certificacion: valorCampo("certificacion"),
    casaCertificadora: valorCampo("casaCertificadora"),
    competencia: valorCampo("competencia"),
    capacidades: valorCampo("capacidades"),
    descripcionCorta: valorCampo("descripcionCorta"),
    metaDescripcion: valorCampo("metaDescripcion"),
    descripcionLarga: valorCampo("descripcionLarga"),
    perfilIngreso: valorCampo("perfilIngreso"),
    perfilSalida: valorCampo("perfilSalida"),
    palabrasClave: valorCampo("palabrasClave"),
    metadata: valorCampo("metadata"),
    documentoWord: nombreArchivo("documentoWord"),
    documentoPdf: nombreArchivo("documentoPdf")
  };
}

function limpiarFormularioCurso() {
  document.getElementById("formCurso").reset();

  for (let i = 0; i < camposCurso.length; i++) {
    quitarEstadoCampo(document.getElementById(camposCurso[i]));
  }

  document.getElementById("estado").value = "Borrador";
  document.getElementById("fechaModificacion").value = fechaDeHoy();
  cambiarCodigoDc();
  cambiarCertificacion();
  calcularTotalHoras();
  actualizarContadores();
}

function registrarCurso(campos, estadoPorDefecto, texto) {
  ocultarMensaje("mensajeCurso");

  if (!validarFormulario(campos)) {
    return;
  }

  let campoCodigo = document.getElementById("codigo");

  if (codigoRepetido(campoCodigo.value.trim())) {
    mostrarError(campoCodigo, "Ya existe un curso con ese código.");
    campoCodigo.focus();
    return;
  }

  let cursos = obtenerCursos();
  cursos.push(crearCurso(estadoPorDefecto));
  guardarCursos(cursos);

  limpiarFormularioCurso();
  mostrarMensaje("mensajeCurso", texto, "valido");
  document.getElementById("mensajeCurso").scrollIntoView({ behavior: "smooth", block: "center" });
}

function enviarCurso(evento) {
  evento.preventDefault();
  registrarCurso(camposCurso, "Borrador", "Curso registrado correctamente.");
}

function guardarBorrador() {
  registrarCurso(camposBorrador, "Borrador", "Borrador guardado correctamente.");
}

cargarListasCurso();
limpiarFormularioCurso();
agregarEventosBlur(camposCurso);

document.getElementById("formCurso").addEventListener("submit", enviarCurso);
document.getElementById("btnBorrador").addEventListener("click", guardarBorrador);
document.getElementById("codigoDc").addEventListener("change", cambiarCodigoDc);
document.getElementById("certificacion").addEventListener("change", cambiarCertificacion);
document.getElementById("horasClase").addEventListener("input", calcularTotalHoras);
document.getElementById("horasExtraclase").addEventListener("input", calcularTotalHoras);
document.getElementById("nombrePowerCampus").addEventListener("input", actualizarContadores);
document.getElementById("descripcionCorta").addEventListener("input", actualizarContadores);
document.getElementById("metaDescripcion").addEventListener("input", actualizarContadores);
