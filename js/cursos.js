// Lista de cursos (RF-72)

// Lista de estados disponibles para filtrar los cursos.
let estadosFiltro = ["Borrador", "En desarrollo", "Aprobado", "En producción", "Inactivo"];

// Lista de modalidades disponibles para filtrar los cursos.
let modalidadesFiltro = ["Virtual", "En vivo", "Presencial", "Híbrida"];

// Devuelve el nombre de la escuela a partir de su código.
function nombreEscuela(codigo) {
  let escuelas = obtenerEscuelas();

  // Recorre la lista de escuelas para encontrar el código recibido.
  for (let i = 0; i < escuelas.length; i++) {
    if (escuelas[i].codigo === codigo) {
      return escuelas[i].nombre;
    }
  }

  // Si no encuentra la escuela, devuelve el código recibido.
  return codigo;
}

// El Director de Escuela solo ve los cursos de sus escuelas (RF-19).
function obtenerCursosVisibles() {
  let sesion = obtenerSesion();
  let cursos = obtenerCursos();
  let escuelas = obtenerEscuelas();
  let visibles = [];

  // Si el usuario no es Director de Escuela, devuelve todos los cursos.
  if (sesion.rol !== "Director de Escuela") {
    return cursos;
  }

  // Recorre los cursos registrados.
  for (let i = 0; i < cursos.length; i++) {

    // Busca la escuela a la que pertenece cada curso.
    for (let j = 0; j < escuelas.length; j++) {

      // Verifica que el curso pertenezca a una escuela dirigida por el usuario.
      if (escuelas[j].codigo === cursos[i].escuela && escuelas[j].director === sesion.correo) {
        visibles.push(cursos[i]);
      }
    }
  }

  // Devuelve únicamente los cursos de las escuelas del director.
  return visibles;
}

// Devuelve el texto que se mostrará en la columna del código.
function textoCodigo(curso) {
  if (curso.codigoDc) {
    return "Lo genera DC";
  }
  return curso.codigo;
}

// Genera el texto según la cantidad de cursos encontrados.
function textoTotal(total) {
  if (total === 1) {
    return "1 curso encontrado";
  }
  return total + " cursos encontrados";
}

// Crea una celda de la tabla con el texto recibido.
function crearCelda(texto) {
  let celda = document.createElement("td");

  // Si el contenido está vacío, muestra un guion.
  if (texto === "") {
    texto = "—";
  }

  celda.textContent = texto;
  return celda;
}

// Agrega una opción a una lista desplegable.
function agregarOpcionFiltro(id, valor, texto) {
  let opcion = document.createElement("option");

  opcion.value = valor;
  opcion.textContent = texto;
  document.getElementById(id).appendChild(opcion);
}

// Carga las opciones disponibles en los filtros.
function cargarFiltros() {
  let escuelas = obtenerEscuelas();

  // Agrega las escuelas registradas al filtro.
  for (let i = 0; i < escuelas.length; i++) {
    agregarOpcionFiltro("filtroEscuela", escuelas[i].codigo, escuelas[i].nombre);
  }

  // Agrega los estados disponibles al filtro.
  for (let i = 0; i < estadosFiltro.length; i++) {
    agregarOpcionFiltro("filtroEstado", estadosFiltro[i], estadosFiltro[i]);
  }

  // Agrega las modalidades disponibles al filtro.
  for (let i = 0; i < modalidadesFiltro.length; i++) {
    agregarOpcionFiltro("filtroModalidad", modalidadesFiltro[i], modalidadesFiltro[i]);
  }
}

// Revisa si el curso cumple el texto y los filtros elegidos.
function cumpleFiltros(curso) {
  let texto = document.getElementById("buscarCurso").value.trim().toLowerCase();
  let escuela = document.getElementById("filtroEscuela").value;
  let estado = document.getElementById("filtroEstado").value;
  let modalidad = document.getElementById("filtroModalidad").value;

  // Convierte el código y el nombre a minúsculas para facilitar la búsqueda.
  let codigo = curso.codigo.toLowerCase();
  let nombre = curso.nombreOficial.toLowerCase();

  // Verifica si el código o el nombre contienen el texto buscado.
  if (texto !== "" && !codigo.includes(texto) && !nombre.includes(texto)) {
    return false;
  }

  // Verifica si el curso pertenece a la escuela seleccionada.
  if (escuela !== "" && curso.escuela !== escuela) {
    return false;
  }

  // Verifica si el curso tiene el estado seleccionado.
  if (estado !== "" && curso.estado !== estado) {
    return false;
  }

  // Verifica si el curso tiene la modalidad seleccionada.
  if (modalidad !== "" && curso.modalidad !== modalidad) {
    return false;
  }

  return true;
}

// Restablece los filtros y actualiza la tabla.
function restablecerFiltros() {
  document.getElementById("formFiltros").reset();
  dibujarTablaCursos();
}

// Construye la tabla mostrando únicamente los cursos que cumplen los filtros.
function dibujarTablaCursos() {
  let cursos = obtenerCursos();
  let cuerpo = document.getElementById("tablaCursos");
  let encontrados = 0;

  // Limpia la tabla antes de mostrar los resultados.
  cuerpo.innerHTML = "";

  // Recorre los cursos registrados.
  for (let i = 0; i < cursos.length; i++) {

    // Omite los cursos que no cumplen los filtros.
    if (!cumpleFiltros(cursos[i])) {
      continue;
    }

    encontrados++;

    // Crea una fila para mostrar la información del curso.
    let fila = document.createElement("tr");

    fila.appendChild(crearCelda(textoCodigo(cursos[i])));
    fila.appendChild(crearCelda(cursos[i].nombreOficial));
    fila.appendChild(crearCelda(nombreEscuela(cursos[i].escuela)));
    fila.appendChild(crearCelda(cursos[i].modalidad));
    fila.appendChild(crearCelda(cursos[i].estado));
    cuerpo.appendChild(fila);
  }

  // Actualiza la cantidad de cursos encontrados.
  document.getElementById("totalCursos").textContent = textoTotal(encontrados);

  // Si ningún curso coincide, se muestra un mensaje en lugar de la tabla.
  if (encontrados > 0) {
    document.getElementById("contenedorTabla").classList.remove("oculto");
    document.getElementById("sinCursos").classList.add("oculto");
  } else {
    document.getElementById("contenedorTabla").classList.add("oculto");
    document.getElementById("sinCursos").classList.remove("oculto");

    // Muestra un mensaje diferente según existan cursos registrados o no.
    if (cursos.length === 0) {
      document.getElementById("sinCursos").textContent = "Todavía no hay cursos registrados.";
    } else {
      document.getElementById("sinCursos").textContent = "No hay cursos que coincidan con los filtros.";
    }
  }
}

// Carga los filtros y muestra los cursos al iniciar.
cargarFiltros();
dibujarTablaCursos();

// Evita que el formulario se envíe y recargue la página.
document.getElementById("formFiltros").addEventListener("submit", function (evento) {
  evento.preventDefault();
});

// Actualiza la tabla cada vez que cambia el texto de búsqueda.
document.getElementById("buscarCurso").addEventListener("input", dibujarTablaCursos);

// Actualiza la tabla cuando cambia la escuela seleccionada.
document.getElementById("filtroEscuela").addEventListener("change", dibujarTablaCursos);

// Actualiza la tabla cuando cambia el estado seleccionado.
document.getElementById("filtroEstado").addEventListener("change", dibujarTablaCursos);

// Actualiza la tabla cuando cambia la modalidad seleccionada.
document.getElementById("filtroModalidad").addEventListener("change", dibujarTablaCursos);

// Restablece los filtros cuando se hace clic en el botón.
document.getElementById("btnRestablecer").addEventListener("click", restablecerFiltros);