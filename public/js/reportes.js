let estadosReporte = ["Borrador", "En desarrollo", "Aprobado", "En producción", "Inactivo"];
let periodosReporte = ["I cuatrimestre", "II cuatrimestre", "III cuatrimestre"];

function nombreEscuelaReporte(codigo) {
  let escuelas = obtenerEscuelas();

  for (let i = 0; i < escuelas.length; i++) {
    if (escuelas[i].codigo === codigo) {
      return escuelas[i].nombre;
    }
  }
  return codigo;
}

function cursosDelReporte() {
  let sesion = obtenerSesion();
  let cursos = obtenerCursos();
  let escuelas = obtenerEscuelas();
  let visibles = [];

  if (sesion.rol !== "Director de Escuela") {
    return cursos;
  }

  for (let i = 0; i < cursos.length; i++) {
    for (let j = 0; j < escuelas.length; j++) {
      if (escuelas[j].codigo === cursos[i].escuela && escuelas[j].director === sesion.correo) {
        visibles.push(cursos[i]);
      }
    }
  }
  return visibles;
}

function agregarOpcionReporte(id, valor, texto) {
  let opcion = document.createElement("option");

  opcion.value = valor;
  opcion.textContent = texto;
  document.getElementById(id).appendChild(opcion);
}

function cargarFiltrosReporte() {
  let escuelas = obtenerEscuelas();

  for (let i = 0; i < estadosReporte.length; i++) {
    agregarOpcionReporte("filtroEstadoReporte", estadosReporte[i], estadosReporte[i]);
  }

  for (let i = 0; i < periodosReporte.length; i++) {
    agregarOpcionReporte("filtroPeriodoReporte", periodosReporte[i], periodosReporte[i]);
  }

  for (let i = 0; i < escuelas.length; i++) {
    agregarOpcionReporte("filtroEscuelaReporte", escuelas[i].codigo, escuelas[i].nombre);
  }
}

function cumpleFiltrosReporte(curso) {
  let estado = document.getElementById("filtroEstadoReporte").value;
  let periodo = document.getElementById("filtroPeriodoReporte").value;
  let escuela = document.getElementById("filtroEscuelaReporte").value;

  if (estado !== "" && curso.estado !== estado) {
    return false;
  }
  if (periodo !== "" && curso.periodo !== periodo) {
    return false;
  }
  if (escuela !== "" && curso.escuela !== escuela) {
    return false;
  }
  return true;
}

function claseEstadoReporte(estado) {
  if (estado === "Borrador") {
    return "badge-estado borrador";
  }
  if (estado === "En desarrollo") {
    return "badge-estado en-desarrollo";
  }
  if (estado === "Aprobado") {
    return "badge-estado aprobado";
  }
  if (estado === "En producción") {
    return "badge-estado en-produccion";
  }
  if (estado === "Inactivo") {
    return "badge-estado inactivo";
  }
  return "badge text-bg-secondary";
}

function crearCeldaReporte(texto) {
  let celda = document.createElement("td");

  if (texto === undefined || texto === null || texto === "") {
    texto = "—";
  }
  celda.textContent = texto;
  return celda;
}

function crearCeldaEstadoReporte(estado) {
  let celda = document.createElement("td");
  let badge = document.createElement("span");

  badge.className = claseEstadoReporte(estado);
  badge.textContent = estado || "—";
  celda.appendChild(badge);
  return celda;
}

function contarPorEstado(cursos, estado) {
  let total = 0;

  for (let i = 0; i < cursos.length; i++) {
    if (cursos[i].estado === estado) {
      total++;
    }
  }
  return total;
}

function dibujarResumen(cursos) {
  let resumen = document.getElementById("resumenReporte");

  resumen.innerHTML = "";

  for (let i = 0; i < estadosReporte.length; i++) {
    let columna = document.createElement("div");
    let tarjeta = document.createElement("div");
    let cuerpo = document.createElement("div");
    let cantidad = document.createElement("p");
    let nombre = document.createElement("p");

    columna.className = "col";
    tarjeta.className = "card h-100 text-center";
    cuerpo.className = "card-body";
    cantidad.className = "fs-2 fw-bold mb-0";
    nombre.className = "mb-0";

    cantidad.textContent = contarPorEstado(cursos, estadosReporte[i]);
    nombre.textContent = estadosReporte[i];

    cuerpo.appendChild(cantidad);
    cuerpo.appendChild(nombre);
    tarjeta.appendChild(cuerpo);
    columna.appendChild(tarjeta);
    resumen.appendChild(columna);
  }
}

function textoTotalReporte(total) {
  if (total === 1) {
    return "1 curso encontrado";
  }
  return total + " cursos encontrados";
}

function textoCodigoReporte(curso) {
  if (curso.codigoDc) {
    return "Lo genera DC";
  }
  return curso.codigo;
}

function dibujarReporte() {
  let cursos = cursosDelReporte();
  let filtrados = [];
  let cuerpo = document.getElementById("tablaReporte");
  let sinReporte = document.getElementById("sinReporte");

  for (let i = 0; i < cursos.length; i++) {
    if (cumpleFiltrosReporte(cursos[i])) {
      filtrados.push(cursos[i]);
    }
  }

  dibujarResumen(filtrados);
  cuerpo.innerHTML = "";

  for (let i = 0; i < filtrados.length; i++) {
    let fila = document.createElement("tr");

    fila.appendChild(crearCeldaReporte(textoCodigoReporte(filtrados[i])));
    fila.appendChild(crearCeldaReporte(filtrados[i].nombreOficial));
    fila.appendChild(crearCeldaReporte(nombreEscuelaReporte(filtrados[i].escuela)));
    fila.appendChild(crearCeldaReporte(filtrados[i].periodo));
    fila.appendChild(crearCeldaEstadoReporte(filtrados[i].estado));
    fila.appendChild(crearCeldaReporte(filtrados[i].fechaModificacion));
    cuerpo.appendChild(fila);
  }

  document.getElementById("totalReporte").textContent = textoTotalReporte(filtrados.length);

  if (filtrados.length > 0) {
    document.getElementById("contenedorReporte").classList.remove("oculto");
    sinReporte.classList.add("oculto");
  } else {
    document.getElementById("contenedorReporte").classList.add("oculto");
    sinReporte.classList.remove("oculto");

    if (cursos.length === 0) {
      sinReporte.textContent = "Todavía no hay cursos registrados.";
    } else {
      sinReporte.textContent = "No hay cursos que coincidan con los filtros.";
    }
  }
}

function restablecerReporte() {
  document.getElementById("formReporte").reset();
  dibujarReporte();
}

cargarFiltrosReporte();
dibujarReporte();

document.getElementById("formReporte").addEventListener("submit", function (evento) {
  evento.preventDefault();
});
document.getElementById("filtroEstadoReporte").addEventListener("change", dibujarReporte);
document.getElementById("filtroPeriodoReporte").addEventListener("change", dibujarReporte);
document.getElementById("filtroEscuelaReporte").addEventListener("change", dibujarReporte);
document.getElementById("btnRestablecerReporte").addEventListener("click", restablecerReporte);
