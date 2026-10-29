// Menú lateral según el rol del usuario (RF-16).

function opcionesDelRol(rol) {
  if (rol === "Administrador") {
    return ["inicio.html", "cursos.html", "curso-formulario.html", "revision.html",
      "catalogos.html", "usuarios.html", "reportes", "perfil.html"];
  }
  if (rol === "Director de Escuela") {
    return ["inicio.html", "cursos.html", "curso-formulario.html", "reportes", "perfil.html"];
  }
  if (rol === "Desarrollo Curricular") {
    return ["inicio.html", "cursos.html", "revision.html", "usuarios.html", "perfil.html"];
  }
  // Rectoría y Vicerrectoría
  return ["inicio.html", "cursos.html", "reportes", "perfil.html"];
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
  let elementos = document.querySelectorAll(".menu-lateral li");

  for (let i = 0; i < elementos.length; i++) {
    let enlace = elementos[i].querySelector("a");
    let opcion = "";

    if (enlace !== null) {
      opcion = enlace.getAttribute("href");
    } else if (elementos[i].querySelector(".menu-deshabilitado") !== null) {
      opcion = "reportes";
    }

    if (opcion !== "" && !tieneOpcion(rol, opcion)) {
      elementos[i].classList.add("oculto");
    }
  }
}

let sesionMenu = obtenerSesion();

if (sesionMenu !== null) {
  armarMenu(sesionMenu.rol);
}
