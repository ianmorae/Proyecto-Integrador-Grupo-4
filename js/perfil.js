// RF-09: Imagen de perfil.

const sesionPerfil = obtenerSesion();

if (sesionPerfil === null) {
  window.location.href = "../index.html";
} else {
  const usuarioPerfil = buscarPorCorreo(sesionPerfil.correo);

  if (usuarioPerfil === null) {
    window.location.href = "../index.html";
  } else {
    const formulario = document.getElementById("formImagenPerfil");
    const seleccionAvatar = document.getElementById("seleccionAvatar");
    const mensaje = document.getElementById("mensajeImagenPerfil");

    function calcularEdad(fechaNacimiento) {
      if (!fechaNacimiento) {
        return "No disponible";
      }

      const fecha = new Date(fechaNacimiento + "T00:00:00");

      if (isNaN(fecha.getTime())) {
        return "No disponible";
      }

      const hoy = new Date();
      let edad = hoy.getFullYear() - fecha.getFullYear();

      if (
        hoy.getMonth() < fecha.getMonth() ||
        (hoy.getMonth() === fecha.getMonth() &&
          hoy.getDate() < fecha.getDate())
      ) {
        edad--;
      }

      return edad + " años";
    }

    function mostrarPerfil() {
      const imagen = usuarioPerfil.imagen || "A1";
      const nombreCompleto =
        usuarioPerfil.nombre + " " + usuarioPerfil.apellidos;

      document.getElementById("nombreEncabezado").textContent =
        nombreCompleto;
      document.getElementById("rolEncabezado").textContent =
        usuarioPerfil.rol || "";

      document.getElementById("nombrePerfil").textContent =
        nombreCompleto;
      document.getElementById("rolPerfil").textContent =
        usuarioPerfil.rol || "Sin rol asignado";
      document.getElementById("escuelaPerfil").textContent =
        usuarioPerfil.escuela || "";

      document.getElementById("identificacionPerfil").textContent =
        usuarioPerfil.identificacion || "No disponible";
      document.getElementById("correoPerfil").textContent =
        usuarioPerfil.correoInstitucional || "No disponible";
      document.getElementById("correoPersonalPerfil").textContent =
        usuarioPerfil.correoPersonal || "No disponible";
      document.getElementById("celularPerfil").textContent =
        usuarioPerfil.celular || "No disponible";
      document.getElementById("fechaNacimientoPerfil").textContent =
        usuarioPerfil.fechaNacimiento || "No disponible";
      document.getElementById("edadPerfil").textContent =
        calcularEdad(usuarioPerfil.fechaNacimiento);
      document.getElementById("sexoPerfil").textContent =
        usuarioPerfil.sexo || "No disponible";

      document.getElementById("avatarActual").textContent = imagen;
      document.getElementById("avatarEncabezado").textContent = imagen;

      document.querySelectorAll('input[name="imagenPerfil"]').forEach(
        function (opcion) {
          opcion.checked = opcion.value === imagen;
        }
      );
    }

    document.getElementById("btnCambiarAvatar").addEventListener(
      "click",
      function () {
        seleccionAvatar.classList.remove("oculto");
        mensaje.textContent = "";
      }
    );

    document.getElementById("btnCancelarAvatar").addEventListener(
      "click",
      function () {
        mostrarPerfil();
        seleccionAvatar.classList.add("oculto");
        mensaje.textContent = "";
      }
    );

    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();

      const seleccion = document.querySelector(
        'input[name="imagenPerfil"]:checked'
      );

      if (seleccion === null) {
        mensaje.textContent = "Selecciona un avatar.";
        return;
      }

      if (actualizarImagenPerfil(seleccion.value)) {
        usuarioPerfil.imagen = seleccion.value;
        mostrarPerfil();
        seleccionAvatar.classList.add("oculto");
        mensaje.textContent = "Avatar actualizado correctamente.";
      } else {
        mensaje.textContent = "No se pudo actualizar el avatar.";
      }
    });

    document.getElementById("btnCerrarSesion").addEventListener(
      "click",
      function () {
        cerrarSesion();
        window.location.href = "../index.html";
      }
    );

    mostrarPerfil();
  }
}
