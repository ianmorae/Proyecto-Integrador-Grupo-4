// Gestión de la imagen de perfil.

const sesionPerfil = obtenerSesion();

if (sesionPerfil === null) {
  window.location.href = "../index.html";
} else {
  const usuarioPerfil = buscarPorCorreo(sesionPerfil.correo);

  if (usuarioPerfil === null) {
    window.location.href = "../index.html";
  } else {
    const avatarActual = document.getElementById("avatarActual");
    const formulario = document.getElementById("formImagenPerfil");
    const mensaje = document.getElementById("mensajeImagenPerfil");

    function mostrarPerfil() {
      const imagen = usuarioPerfil.imagen || "A1";

      avatarActual.textContent = imagen;
      avatarActual.setAttribute("aria-label", "Avatar actual: " + imagen);

      document.getElementById("nombrePerfil").textContent =
        usuarioPerfil.nombre + " " + usuarioPerfil.apellidos;

      document.getElementById("rolPerfil").textContent =
        usuarioPerfil.rol || "Sin rol asignado";

      document.getElementById("identificacionPerfil").textContent =
        usuarioPerfil.identificacion || "No disponible";

      document.getElementById("correoPerfil").textContent =
        usuarioPerfil.correoInstitucional || "No disponible";

      document.getElementById("correoPersonalPerfil").textContent =
        usuarioPerfil.correoPersonal || "No disponible";

      document.getElementById("celularPerfil").textContent =
        usuarioPerfil.celular || "No disponible";

      const opciones = document.querySelectorAll(
        'input[name="imagenPerfil"]'
      );

      opciones.forEach(function (opcion) {
        opcion.checked = opcion.value === imagen;
      });
    }

    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();

      const seleccion = document.querySelector(
        'input[name="imagenPerfil"]:checked'
      );

      if (seleccion === null) {
        mensaje.textContent = "Selecciona una imagen antes de guardar.";
        return;
      }

      const actualizado = actualizarImagenPerfil(seleccion.value);

      if (actualizado) {
        usuarioPerfil.imagen = seleccion.value;
        avatarActual.textContent = seleccion.value;
        avatarActual.setAttribute(
          "aria-label",
          "Avatar actual: " + seleccion.value
        );

        mensaje.textContent = "La imagen de perfil se guardó correctamente.";
      } else {
        mensaje.textContent =
          "No se pudo guardar la imagen. Inténtalo nuevamente.";
      }
    });

    mostrarPerfil();
  }
}