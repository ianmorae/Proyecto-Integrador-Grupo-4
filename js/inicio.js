// Página de inicio (inicio.html).

let sesion = obtenerSesion();

if (sesion === null) {
  window.location.href = "../index.html";
} else {
  document.getElementById("saludoInicio").textContent = "Bienvenido, " + sesion.nombre;
  document.getElementById("rolInicio").textContent = "Rol: " + sesion.rol;

  // Aviso cuando se intentó entrar a una página sin permiso (RF-16).
  if (window.location.search === "?sinPermiso=1") {
    document.getElementById("mensajeInicio").classList.remove("oculto");
  }

  // Los accesos rápidos solo se muestran si el rol tiene esa página.
  let accesos = document.querySelectorAll(".contenido .acciones a");
  let visibles = 0;

  for (let i = 0; i < accesos.length; i++) {
    if (tieneOpcion(sesion.rol, accesos[i].getAttribute("href"))) {
      visibles++;
    } else {
      accesos[i].classList.add("oculto");
    }
  }

  // Si el rol no tiene ningún acceso rápido, se oculta la sección.
  if (visibles === 0) {
    document.getElementById("accesosRapidos").classList.add("oculto");
  }
}
