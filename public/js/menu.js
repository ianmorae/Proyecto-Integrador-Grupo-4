// Menú lateral y acceso a las páginas según el rol del usuario (RF-16).

function opcionesDelRol(rol) {
  if (rol === "Administrador") {
    return ["inicio.html", "cursos.html", "curso-formulario.html", "revision.html", "curso-detalle.html", "catalogos.html",
            "usuarios.html", "reportes.html", "perfil.html"];
  }
  if (rol === "Director de Escuela") {
    return ["inicio.html", "cursos.html", "curso-formulario.html", "curso-detalle.html", "reportes.html", "perfil.html"];
  }
  if (rol === "Desarrollo Curricular") {
    return ["inicio.html", "cursos.html", "revision.html", "curso-detalle.html", "perfil.html"];
  }
  // Rectoría y Vicerrectoría
  return ["inicio.html", "cursos.html", "curso-detalle.html", "reportes.html", "perfil.html"];
}

function tieneOpcion(rol, opcion) {
  let opciones = opcionesDelRol(rol);

  for (let i = 0; i < opciones.length; i++) {
    if (opciones[i] === opcion) {
      return true;
    }
  }
  return false;
}

function armarMenu(rol) {
  let elementos = document.querySelectorAll(".menu-lateral .list-group-item");

  for (let i = 0; i < elementos.length; i++) {
    let opcion = "";

    if (elementos[i].tagName === "A") {
      opcion = elementos[i].getAttribute("href");
    }

    if (opcion !== "" && !tieneOpcion(rol, opcion)) {
      elementos[i].classList.add("oculto");
    }
  }
}

function paginaActual() {
  let partes = window.location.pathname.split("/");
  return partes[partes.length - 1];
}

let sesionMenu = obtenerSesion();
let paginaMenu = paginaActual();

if (sesionMenu === null) {
  window.location.href = "../index.html";
} else if (!tieneOpcion(sesionMenu.rol, paginaMenu)) {
  // Si el rol no tiene esa página, vuelve al inicio con un aviso.
  window.location.href = "inicio.html?sinPermiso=1";
} else {
  armarMenu(sesionMenu.rol);
}
