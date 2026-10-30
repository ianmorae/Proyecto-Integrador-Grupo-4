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

// Construye y muestra la tabla con los cursos registrados.
function dibujarTablaCursos() {
  let cursos = obtenerCursos();
  let cuerpo = document.getElementById("tablaCursos");

  // Limpia la tabla antes de agregar los datos.
  cuerpo.innerHTML = "";

  // Recorre los cursos y crea una fila para cada uno.
  for (let i = 0; i < cursos.length; i++) {
    let fila = document.createElement("tr");

    // Agrega los datos del curso en sus respectivas columnas.
    fila.appendChild(crearCelda(textoCodigo(cursos[i])));
    fila.appendChild(crearCelda(cursos[i].nombreOficial));
    fila.appendChild(crearCelda(nombreEscuela(cursos[i].escuela)));
    fila.appendChild(crearCelda(cursos[i].modalidad));
    fila.appendChild(crearCelda(cursos[i].estado));

    // Agrega la fila completa a la tabla.
    cuerpo.appendChild(fila);
  }

  // Actualiza el mensaje con la cantidad de cursos encontrados.
  document.getElementById("totalCursos").textContent = textoTotal(cursos.length);

  // Muestra la tabla si existen cursos registrados.
  if (cursos.length > 0) {
    document.getElementById("contenedorTabla").classList.remove("oculto");
    document.getElementById("sinCursos").classList.add("oculto");
  } else {
    // Oculta la tabla y muestra el mensaje cuando no hay cursos.
    document.getElementById("contenedorTabla").classList.add("oculto");
    document.getElementById("sinCursos").classList.remove("oculto");
  }
}

// Ejecuta la función para mostrar los cursos al cargar el archivo.
dibujarTablaCursos();