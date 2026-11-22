
// RF-09: Imagen de perfil.

// Obtener la sesión del usuario que inició sesión.
const sesionPerfil = obtenerSesion();

// Verificar que exista una sesión activa.
if (sesionPerfil === null) {
  window.location.href = "../index.html";

} else {

  // Buscar los datos del usuario que inició sesión.
  const usuarioPerfil = buscarPorCorreo(sesionPerfil.correo);

  if (usuarioPerfil === null) {
    window.location.href = "../index.html";

  } else {

    const formulario = document.getElementById("formImagenPerfil");
    const seleccionAvatar = document.getElementById("seleccionAvatar");
    const mensaje = document.getElementById("mensajeImagenPerfil");

    // Mostrar una imagen dentro del contenedor indicado.
    function mostrarImagenAvatar(idContenedor, imagen) {
      const contenedor = document.getElementById(idContenedor);

      // Si el usuario todavía no tiene imagen, utilizar A1.
      const avatar = imagen || "A1";

      // Crear el elemento de imagen.
      const foto = document.createElement("img");
      foto.src = "../img/" + avatar + ".png";
      foto.alt = "Imagen de perfil";

      // Limpiar el contenido anterior y agregar la imagen.
      contenedor.innerHTML = "";
      contenedor.appendChild(foto);
    }

    // Calcular la edad a partir de la fecha de nacimiento.
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

    // Mostrar los datos y la imagen del usuario.
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

      // Mostrar la imagen en el perfil y en el encabezado.
      mostrarImagenAvatar("avatarActual", imagen);
      mostrarImagenAvatar("avatarEncabezado", imagen);

      // Marcar el avatar que tiene guardado el usuario.
      document.querySelectorAll(
        'input[name="avatarUsuario"]'
      ).forEach(function (opcion) {

        opcion.checked = opcion.value === imagen;

      });
    }

    // Mostrar las opciones para cambiar el avatar.
    document.getElementById("btnCambiarAvatar").addEventListener(
      "click",
      function () {

        seleccionAvatar.classList.remove("oculto");
        mensaje.textContent = "";

      }
    );

    // Cancelar el cambio y conservar la imagen anterior.
    document.getElementById("btnCancelarAvatar").addEventListener(
      "click",
      function () {

        mostrarPerfil();
        seleccionAvatar.classList.add("oculto");
        mensaje.textContent = "";

      }
    );

    // Guardar la nueva imagen seleccionada.
    formulario.addEventListener("submit", function (evento) {

      evento.preventDefault();

      // Obtener el avatar seleccionado.
      const seleccion = document.querySelector(
        'input[name="avatarUsuario"]:checked'
      );

      if (seleccion === null) {
        mensaje.textContent = "Selecciona una imagen de perfil.";
        return;
      }

      // Guardar la imagen en los datos del usuario.
      if (actualizarImagenPerfil(seleccion.value)) {

        usuarioPerfil.imagen = seleccion.value;

        // Actualizar la imagen en pantalla.
        mostrarPerfil();

        // Ocultar las opciones después de guardar.
        seleccionAvatar.classList.add("oculto");

        mensaje.textContent = "Imagen de perfil actualizada correctamente.";

      } else {

        mensaje.textContent = "No se pudo actualizar la imagen de perfil.";

      }
    });

    // Cerrar la sesión del usuario.
    document.getElementById("btnCerrarSesion").addEventListener(
      "click",
      function () {

        cerrarSesion();
        window.location.href = "../index.html";

      }
    );

    // Cargar los datos del perfil al abrir la página.
    mostrarPerfil();
  }
}
