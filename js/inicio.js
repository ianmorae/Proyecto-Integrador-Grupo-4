// Página de inicio (inicio.html).

let sesion = obtenerSesion();

if (sesion === null) {
  window.location.href = "../index.html";
} else {
  document.getElementById("saludoInicio").textContent = "Bienvenido, " + sesion.nombre;
  document.getElementById("rolInicio").textContent = "Rol: " + sesion.rol;
}
