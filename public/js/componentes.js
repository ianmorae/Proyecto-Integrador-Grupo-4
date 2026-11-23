// Encabezado, menú lateral y pie de página comunes a todas las páginas.
// Se generan con JavaScript para no repetir el mismo HTML en cada página.
// Usan los componentes de Bootstrap: navbar, offcanvas y list group.

function nombrePagina() {
  let partes = window.location.pathname.split("/");
  return partes[partes.length - 1];
}

// Navbar: botón del menú (solo en pantallas pequeñas), logo, nombre del sistema,
// idioma y usuario con su rol.
function crearEncabezado() {
  let sesion = obtenerSesion();
  let nombre = "";
  let rol = "";
  let imagen = "A1";

  if (sesion !== null) {
    nombre = sesion.nombre + " " + sesion.apellidos;
    rol = sesion.rol;
    imagen = sesion.imagen || "A1";
  }

  let encabezado = document.getElementById("encabezado");
  encabezado.className = "encabezado navbar";
  encabezado.setAttribute("data-bs-theme", "dark");

  encabezado.innerHTML =
    '<div class="container-fluid gap-2">' +
    '<button type="button" class="navbar-toggler d-lg-none" data-bs-toggle="offcanvas" ' +
    'data-bs-target="#menu" aria-controls="menu" aria-label="Abrir el menú">' +
    '<span class="navbar-toggler-icon"></span>' +
    '</button>' +
    '<a class="navbar-brand d-flex align-items-center gap-2 me-auto" href="inicio.html">' +
    '<img src="../img/logo.png" alt="Logo Universidad CENFOTEC">' +
    '<span class="nombre-sistema d-none d-md-inline">Sistema de Gestión Curricular</span>' +
    '</a>' +
    '<div class="btn-group btn-group-sm" role="group" aria-label="Idioma">' +
    '<button type="button" class="btn btn-light" aria-pressed="true">ES</button>' +
    '<button type="button" class="btn btn-outline-light" aria-pressed="false">EN</button>' +
    '</div>' +
    '<div class="usuario-encabezado d-flex align-items-center gap-2">' +
    '<div class="text-end d-none d-sm-block">' +
    '<strong id="nombreEncabezado" class="d-block"></strong>' +
    '<small id="rolEncabezado" class="d-block"></small>' +
    '</div>' +
    '<div id="avatarEncabezado" class="avatar-perfil avatar-pequeno"></div>' +
    '</div>' +
    '</div>';

  // textContent para que el nombre se muestre como texto y no como HTML.
  document.getElementById("nombreEncabezado").textContent = nombre;
  document.getElementById("rolEncabezado").textContent = rol;

  let foto = document.createElement("img");
  foto.src = "../img/" + imagen + ".png";
  foto.alt = "Imagen de perfil";
  document.getElementById("avatarEncabezado").appendChild(foto);
}

// Una opción del menú. La opción de la página actual queda marcada como activa.
function opcionMenu(pagina, texto) {
  let clase = "list-group-item list-group-item-action";
  let actual = "";

  if (nombrePagina() === pagina) {
    clase += " active";
    actual = ' aria-current="page"';
  }
  return '<a href="' + pagina + '" class="' + clase + '"' + actual + '>' + texto + '</a>';
}

// Menú lateral: list group en escritorio y offcanvas en pantallas menores de 992 px.
function crearMenu() {
  let menu = document.getElementById("menu");
  menu.className = "menu-lateral offcanvas-lg offcanvas-start";
  menu.setAttribute("tabindex", "-1");
  menu.setAttribute("aria-labelledby", "tituloMenu");

  let html =
    '<div class="offcanvas-header">' +
    '<h2 class="offcanvas-title" id="tituloMenu">Menú</h2>' +
    '<button type="button" class="btn-close" data-bs-dismiss="offcanvas" ' +
    'data-bs-target="#menu" aria-label="Cerrar el menú"></button>' +
    '</div>' +
    '<div class="offcanvas-body">' +
    '<div class="list-group list-group-flush w-100">' +
    opcionMenu("inicio.html", "Inicio") +
    opcionMenu("cursos.html", "Cursos") +
    opcionMenu("curso-formulario.html", "Nuevo curso") +
    opcionMenu("revision.html", "Revisión") +
    opcionMenu("catalogos.html", "Catálogos") +
    opcionMenu("usuarios.html", "Usuarios") +
    '<span class="list-group-item disabled menu-deshabilitado" aria-disabled="true">' +
    'Reportes <small>(En construcción)</small></span>' +
    opcionMenu("perfil.html", "Mi perfil");

  if (nombrePagina() === "perfil.html") {
    html +=
      '<button type="button" id="btnCerrarSesion" ' +
      'class="list-group-item list-group-item-action cerrar-sesion">Cerrar sesión</button>';
  }
  html += '</div></div>';

  menu.innerHTML = html;
}

function crearPiePagina() {
  let pie = document.getElementById("piePagina");
  pie.className = "pie-pagina py-3 text-center";
  pie.innerHTML = '<p class="mb-0">© 2026 Universidad CENFOTEC · Sistema de Gestión Curricular</p>';
}

crearEncabezado();
crearMenu();
crearPiePagina();
