// Inicio de sesión (index.html).

let camposLogin = ["correoLogin", "contrasenaLogin"];

function iniciarSesion(usuario) {
  let sesion = {
    nombre: usuario.nombre,
    apellidos: usuario.apellidos,
    correo: usuario.correoInstitucional,
    rol: usuario.rol,
    imagen: usuario.imagen || "A1"
  };
  guardarSesion(sesion);
  window.location.href = "pages/inicio.html";
}

function ingresar(evento) {
  evento.preventDefault();
  ocultarMensaje("mensajeLogin");

  if (!validarFormulario(camposLogin)) {
    return;
  }

  let correo = document.getElementById("correoLogin").value.trim();
  let contrasena = document.getElementById("contrasenaLogin").value;
  let usuario = buscarPorCorreo(correo);

  if (usuario !== null && cumplePolitica(contrasena) && usuario.contrasena === btoa(contrasena)) {
    iniciarSesion(usuario);
  } else {
    mostrarMensaje("mensajeLogin", "Correo o contraseña incorrectos.", "error");
  }
}

cargarAdministrador();
agregarEventosBlur(camposLogin);
document.getElementById("formLogin").addEventListener("submit", ingresar);
