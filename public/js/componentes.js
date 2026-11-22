// Encabezado, menú lateral y pie de página comunes a todas las páginas.
// Se generan con JavaScript para no repetir el mismo HTML en cada página.

function nombrePagina() {
  let partes = window.location.pathname.split("/");
  return partes[partes.length - 1];
}

function crearEncabezado() {
  let html =
    '<img src="../img/logo.png" alt="Logo Universidad CENFOTEC">' +
    '<p class="nombre-sistema">Sistema de Gestión Curricular</p>' +
    '<div class="idioma">' +
    '<button type="button" class="idioma-activo">ES</button>' +
    '<button type="button">EN</button>' +
    '</div>';

  // Mi perfil también muestra el nombre, el rol y el avatar del usuario.
  if (nombrePagina() === "perfil.html") {
    html +=
      '<div class="perfil-encabezado">' +
      '<div>' +
      '<strong id="nombreEncabezado"></strong>' +
      '<small id="rolEncabezado"></small>' +
      '</div>' +
      '<div id="avatarEncabezado" class="avatar-perfil avatar-pequeno">A1</div>' +
      '</div>';
  }

  document.getElementById("encabezado").innerHTML = html;
}

// Marca como activa la opción de la página en la que está el usuario.
function opcionMenu(pagina, texto) {
  let clase = "";

  if (nombrePagina() === pagina) {
    clase = ' class="menu-activo"';
  }
  return '<li><a href="' + pagina + '"' + clase + '>' + texto + '</a></li>';
}

function crearMenu() {
  let html =
    '<ul>' +
    opcionMenu("inicio.html", "Inicio") +
    opcionMenu("cursos.html", "Cursos") +
    opcionMenu("curso-formulario.html", "Nuevo curso") +
    opcionMenu("revision.html", "Revisión") +
    opcionMenu("catalogos.html", "Catálogos") +
    opcionMenu("usuarios.html", "Usuarios") +
    '<li><span class="menu-deshabilitado">Reportes <small>(En construcción)</small></span></li>' +
    opcionMenu("perfil.html", "Mi perfil");

  if (nombrePagina() === "perfil.html") {
    html += '<li><button type="button" id="btnCerrarSesion" class="btn-enlace">Cerrar sesión</button></li>';
  }
  html += '</ul>';

  document.getElementById("menu").innerHTML = html;
}

function crearPiePagina() {
  document.getElementById("piePagina").innerHTML =
    '<p>© 2026 Universidad CENFOTEC · Sistema de Gestión Curricular</p>';
}

crearEncabezado();
crearMenu();
crearPiePagina();
