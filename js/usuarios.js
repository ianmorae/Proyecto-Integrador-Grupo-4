// Gestión de usuarios (usuarios.html).

// ===== RF-05: Permisos para registrar usuarios =====
function verificarPermisoRegistro() {
  let usuarioActivo = obtenerSesion();

  return Boolean(
    usuarioActivo &&
    (usuarioActivo.rol === "Administrador" || usuarioActivo.rol === "Desarrollo Curricular")
  );
}


// ===== RF-05: Lista de usuarios =====
/*Permite distinguir si se está registrando un usuario nuevo o modificando uno existente*/
let identificacionUsuarioEditando = "";


// Calcula la edad a partir de la fecha de nacimiento (aaaa-mm-dd).
function calcularEdad(fechaTexto) {
  if (!fechaTexto) {
    return "";
  }

  let fecha = new Date(fechaTexto + "T00:00:00");
  let hoy = new Date();
  let edad = hoy.getFullYear() - fecha.getFullYear();

  if (hoy.getMonth() < fecha.getMonth() ||
    (hoy.getMonth() === fecha.getMonth() && hoy.getDate() < fecha.getDate())) {
    edad--;
  }
  return edad;
}

// Agrega una celda con texto a la fila.
function agregarCelda(fila, texto) {
  let celda = document.createElement("td");
  celda.textContent = texto;
  fila.appendChild(celda);
}

function dibujarUsuarios() {
  let tabla = document.getElementById("tablaUsuarios");

  if (tabla === null) {
    return;
  }

  let usuarios = obtenerUsuarios();
  let texto = textoBusquedaUsuario();
  let encontrados = 0;

  tabla.innerHTML = "";

  for (let i = 0; i < usuarios.length; i++) {
    let usuario = usuarios[i];

    if (!coincideUsuario(usuario, texto)) {
      continue;
    }
    encontrados++;

    let fila = document.createElement("tr");
    let celdaAvatar = document.createElement("td");
    let avatar = document.createElement("img");
    let acciones = document.createElement("td");

    if (!usuario.estado) {
      usuario.estado = "Activo";
    }

    avatar.src = "../img/" + (usuario.imagen || "A1") + ".png";
    avatar.alt = "Avatar de " + usuario.nombre;
    avatar.className = "avatar-tabla";
    celdaAvatar.appendChild(avatar);
    fila.appendChild(celdaAvatar);

    agregarCelda(fila, (usuario.nombre || "") + " " + (usuario.apellidos || ""));
    agregarCelda(fila, usuario.identificacion || "");
    agregarCelda(fila, usuario.correoInstitucional || "");
    agregarCelda(fila, usuario.celular || "");
    agregarCelda(fila, calcularEdad(usuario.fechaNacimiento));
    agregarCelda(fila, usuario.sexo || "");
    agregarCelda(fila, usuario.rol || "");
    agregarCelda(fila, usuario.estado);
    acciones.className = "acciones-usuario";

    let editar = document.createElement("button");
    editar.type = "button";
    editar.className = "btn-accion";
    editar.textContent = "Editar";

    editar.addEventListener("click", function () {
      editarUsuario(usuario.identificacion);
    });

    let cambiarEstado = document.createElement("button");
    cambiarEstado.type = "button";
    cambiarEstado.className = "btn-accion";
    cambiarEstado.textContent = "Cambiar estado";

    cambiarEstado.addEventListener("click", function () {
      cambiarEstadoUsuario(usuario.identificacion);
    });

    acciones.appendChild(editar);
    acciones.appendChild(cambiarEstado);
    fila.appendChild(acciones);

    tabla.appendChild(fila);
  }

  guardarUsuarios(usuarios);

  let sinUsuarios = document.getElementById("sinUsuarios");

  if (sinUsuarios !== null) {
    sinUsuarios.classList.toggle("oculto", usuarios.length > 0);
  }

  mostrarSinResultadosUsuarios(usuarios.length, encontrados);
}

// ===== RF-14: Catálogo de roles =====
function obtenerRoles() {
  return ["Administrador", "Rectoría", "Vicerrectoría", "Director de Escuela", "Desarrollo Curricular"];
}

function cargarRoles() {
  let roles = obtenerRoles();
  let lista = document.getElementById("rolUsuario");

  for (let i = 0; i < roles.length; i++) {
    let opcion = document.createElement("option");
    opcion.value = roles[i];
    opcion.textContent = roles[i];
    lista.appendChild(opcion);
  }
}

function esRolValido(rol) {
  let roles = obtenerRoles();

  for (let i = 0; i < roles.length; i++) {
    if (roles[i] === rol) {
      return true;
    }
  }
  return false;
}

/* ===== RF-06: Registro de información del usuario ===== */

let formularioUsuario = document.getElementById("formUsuario");

if (formularioUsuario !== null) {
  if (!verificarPermisoRegistro()) {
    // Sin permiso se regresa al inicio, donde se muestra el aviso.
    window.location.href = "inicio.html?sinPermiso=1";
  } else {
    
    // Dibujar la lista cuando se abre la página.
    dibujarUsuarios();
    cargarRoles();

    // Botón para mostrar el formulario.
    document.getElementById("btnNuevoUsuario")
      .addEventListener("click", function () {
        formularioUsuario.classList.remove("oculto");
        ocultarMensaje("mensajeUsuario");
        ocultarMensaje("mensajeListaUsuarios");

        formularioUsuario.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });

    // Botón para cancelar el registro.
    document.getElementById("btnCancelarUsuario")
      .addEventListener("click", function () {
        formularioUsuario.reset();

        document.getElementById("imagenUsuario").value = "";
        formularioUsuario.classList.add("oculto");

        ocultarMensaje("mensajeUsuario");

        document.getElementById("listaUsuarios")
          .scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
      });

    // Guardar el avatar elegido en el campo oculto.
    let opcionesAvatar = document.querySelectorAll(
      'input[name="avatarUsuario"]'
    );

    for (let i = 0; i < opcionesAvatar.length; i++) {
      opcionesAvatar[i].addEventListener("change", function () {
        document.getElementById("imagenUsuario").value =
          opcionesAvatar[i].value;
      });
    }

    // Calcula la edad a partir de la fecha de nacimiento.
    function actualizarEdad() {

      // Obtiene la fecha de nacimiento ingresada en el formulario.
      let fechaTexto = document.getElementById("fechaNacimiento").value;

      // Obtener el campo donde se mostrará la edad calculada.
      let campoEdad = document.getElementById("edadUsuario");

      // Comprueba si el usuario todavía no ha ingresado su fecha de nacimiento.
      if (fechaTexto === "") {

        // Deja vacío el campo de edad si no hay una fecha ingresada.
        campoEdad.value = "";
        return;
      }

      // Convierte la fecha ingresada en un objeto de tipo Date.
      // Se agrega la hora para evitar problemas al interpretar la fecha.
      let fecha = new Date(fechaTexto + "T00:00:00");

      // Obtiene la fecha actual del sistema.
      let hoy = new Date();

      // Calcula una edad inicial restando los años.
      let edad = hoy.getFullYear() - fecha.getFullYear();

      // Comprueba si la persona todavía no ha cumplido años este año.
      if (
        hoy.getMonth() < fecha.getMonth() ||
        (
          hoy.getMonth() === fecha.getMonth() &&
          hoy.getDate() < fecha.getDate()
        )
      ) {
        // Resta un año porque todavía no ha llegado su cumpleaños.
        edad--;
      }

      // Muestra la edad calculada en el campo correspondiente del formulario.
      campoEdad.value = edad;
    }

    // Detecta cuando el usuario cambia la fecha de nacimiento.
    // En ese momento, ejecuta la función para actualizar la edad automáticamente.
    document.getElementById("fechaNacimiento")
      .addEventListener("change", actualizarEdad);

    formularioUsuario.addEventListener("submit", function (evento) {
      evento.preventDefault();

      let mensaje = document.getElementById("mensajeUsuario");
      mensaje.classList.add("oculto");
      mensaje.classList.remove("error", "valido");

      let nombre = document.getElementById("nombreUsuario").value.trim();
      let primerApellido = document.getElementById("primerApellidoUsuario").value.trim();
      let segundoApellido = document.getElementById("segundoApellidoUsuario").value.trim();
      let identificacion = document.getElementById("identificacionUsuario").value.trim();
      let fechaNacimiento = document.getElementById("fechaNacimiento").value;
      let sexo = document.getElementById("sexoUsuario").value;
      // RF-09: Obtener el avatar seleccionado por el usuario. Permite leer directamente la opción seleccionada entre A1 y A8.
      let avatarSeleccionado = document.querySelector('input[name="avatarUsuario"]:checked');
      let imagen = avatarSeleccionado ? avatarSeleccionado.value: "";

      // Mantener actualizado el campo oculto del formulario.
      document.getElementById("imagenUsuario").value = imagen;
      let correoInstitucional = document.getElementById("correoInstitucional").value.trim();
      let correoPersonal = document.getElementById("correoPersonal").value.trim();
      let celular = document.getElementById("celularUsuario").value.trim();
      let rol = document.getElementById("rolUsuario").value;
      let contrasena = document.getElementById("contrasenaUsuario").value;
      let confirmarContrasena = document.getElementById("confirmarContrasena").value;

      function mostrarErrorUsuario(texto) {
        mensaje.textContent = texto;
        mensaje.classList.remove("oculto", "valido");
        mensaje.classList.add("error");
      }

      // Validar los campos obligatorios.
      if (!validarFormulario(camposUsuario)) {
        return;
      }

      // RF-09: Validar que el avatar seleccionado sea uno de los permitidos.
      const avataresPermitidos = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8","A9", "A10"];

      if (!avataresPermitidos.includes(imagen)) {
        mostrarErrorUsuario("Selecciona una imagen de perfil válida.");
        return;
      }

      // RF-14: El rol debe ser uno del catálogo de roles.
      if (!esRolValido(rol)) {
        mostrarErrorUsuario("Selecciona un rol válido.");
        return;
      }

      // Recuperar los usuarios guardados.
      let usuarios = obtenerUsuarios();

      // Evitar identificaciones y correos institucionales duplicados.
      let duplicado = usuarios.some(function (usuario) {
        return usuario.identificacion !== identificacionUsuarioEditando && (
          usuario.identificacion === identificacion ||
          (
            usuario.correoInstitucional &&usuario.correoInstitucional.toLowerCase() ===
              correoInstitucional.toLowerCase()
          )
        );
      });

      if (duplicado) {
        mostrarErrorUsuario("Ya existe un usuario con esa identificación o correo institucional.");
        return;
      }

      // RF-15: Rectoría, Vicerrectoría y Administrador solo los puede tener un usuario.
      if (rolOcupado(rol)) {
        mostrarError(document.getElementById("rolUsuario"), "Ya existe un usuario con el rol " + rol + ".");
        mostrarErrorUsuario("Ya existe un usuario con el rol " + rol + ".");
        return;
      }

      // Crear el objeto del nuevo usuario.
      let nuevoUsuario = {
        nombre: nombre,
        primerApellido: primerApellido,
        segundoApellido: segundoApellido,
        // Se guardan también juntos porque el perfil y las escuelas muestran "apellidos".
        apellidos: primerApellido + " " + segundoApellido,
        identificacion: identificacion,
        fechaNacimiento: fechaNacimiento,
        edad: calcularEdad(fechaNacimiento),
        sexo: sexo,
        imagen: imagen,
        correoInstitucional: correoInstitucional,
        correoPersonal: correoPersonal,
        celular: celular,
        rol: rol,
        contrasena: btoa(contrasena)
      };

      
      // Guardar el nuevo usuario.
      let textoMensaje = "Usuario registrado correctamente.";

      if (identificacionUsuarioEditando !== "") {
        actualizarUsuario(usuarios, nuevoUsuario);
        textoMensaje = "Usuario actualizado correctamente.";
      } else {
        usuarios.push(nuevoUsuario);
      }

      guardarUsuarios(usuarios);

      // Actualizar la lista de usuarios.
      dibujarUsuarios();

      // Limpiar y ocultar el formulario.
      formularioUsuario.reset();
      document.getElementById("imagenUsuario").value = "";
      formularioUsuario.classList.add("oculto");
      limpiarEdicionUsuario();

      // Mostrar el mensaje en la lista.
      mostrarMensaje(
        "mensajeListaUsuarios",
        textoMensaje,
        "valido"
      );

      // Regresar visualmente a la lista.
      document.getElementById("listaUsuarios")
        .scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

    });
  }
}


// Activa o desactiva un usuario. Un usuario inactivo no puede iniciar sesión.
function cambiarEstadoUsuario(identificacion) {
  let sesion = obtenerSesion();
  let usuarios = obtenerUsuarios();

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].identificacion === identificacion) {

      if (usuarios[i].correoInstitucional.toLowerCase() === sesion.correo.toLowerCase()) {
        mostrarMensaje("mensajeListaUsuarios", "No puedes cambiar el estado de tu propio usuario.", "error");
        return;
      }

      if (usuarios[i].estado === "Inactivo") {
        usuarios[i].estado = "Activo";
      } else {
        usuarios[i].estado = "Inactivo";
      }

      guardarUsuarios(usuarios);
      dibujarUsuarios();
      mostrarMensaje("mensajeListaUsuarios",
        "El usuario " + usuarios[i].nombre + " ahora está " + usuarios[i].estado.toLowerCase() + ".", "valido");
      return;
    }
  }
}

function limpiarEdicionUsuario() {
  identificacionUsuarioEditando = "";
  limpiarEstadosUsuario();
  formularioUsuario.reset();
  document.getElementById("imagenUsuario").value = "";
  document.getElementById("identificacionUsuario").readOnly = false;
}

function buscarUsuarioPorIdentificacion(identificacion) {
  let usuarios = obtenerUsuarios();

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].identificacion === identificacion) {
      return usuarios[i];
    }
  }
  return null;
}

function editarUsuario(identificacion) {
  let sesion = obtenerSesion();

  if (sesion === null || sesion.rol !== "Administrador") {
    mostrarMensaje("mensajeListaUsuarios", "Solo el administrador puede editar usuarios.", "error");
    return;
  }

  let usuario = buscarUsuarioPorIdentificacion(identificacion);

  if (usuario === null) {
    return;
  }

  limpiarEdicionUsuario();
  identificacionUsuarioEditando = usuario.identificacion;

  document.getElementById("nombreUsuario").value = usuario.nombre || "";
  // Los usuarios antiguos solo tienen "apellidos"; se separan por el primer espacio.
  let apellidos = (usuario.apellidos || "").split(" ");
  document.getElementById("primerApellidoUsuario").value = usuario.primerApellido || apellidos[0];
  document.getElementById("segundoApellidoUsuario").value = usuario.segundoApellido || apellidos.slice(1).join(" ");
  document.getElementById("identificacionUsuario").value = usuario.identificacion;
  document.getElementById("identificacionUsuario").readOnly = true;
  document.getElementById("fechaNacimiento").value = usuario.fechaNacimiento || "";
  document.getElementById("sexoUsuario").value = usuario.sexo || "";
  document.getElementById("correoInstitucional").value = usuario.correoInstitucional || "";
  document.getElementById("correoPersonal").value = usuario.correoPersonal || "";
  document.getElementById("celularUsuario").value = usuario.celular || "";
  document.getElementById("rolUsuario").value = usuario.rol || "";
  document.getElementById("contrasenaUsuario").value = atob(usuario.contrasena);
  document.getElementById("confirmarContrasena").value = atob(usuario.contrasena);
  document.getElementById("imagenUsuario").value = usuario.imagen || "";

  let opcionesAvatar = document.querySelectorAll('input[name="avatarUsuario"]');

  for (let i = 0; i < opcionesAvatar.length; i++) {
    opcionesAvatar[i].checked = opcionesAvatar[i].value === usuario.imagen;
  }

  document.getElementById("fechaNacimiento").dispatchEvent(new Event("change"));

  ocultarMensaje("mensajeUsuario");
  ocultarMensaje("mensajeListaUsuarios");
  formularioUsuario.classList.remove("oculto");
  formularioUsuario.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

if (formularioUsuario !== null) {
  document.getElementById("btnNuevoUsuario").addEventListener("click", limpiarEdicionUsuario);
  document.getElementById("btnCancelarUsuario").addEventListener("click", limpiarEdicionUsuario);
}

function actualizarSesionUsuario(anterior, editado) {
  let sesion = obtenerSesion();

  if (sesion !== null && sesion.correo.toLowerCase() === anterior.correoInstitucional.toLowerCase()) {
    guardarSesion({
      nombre: editado.nombre,
      apellidos: editado.apellidos,
      correo: editado.correoInstitucional,
      rol: editado.rol,
      imagen: editado.imagen || "A1"
    });
  }
}

function actualizarUsuario(usuarios, usuarioEditado) {
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].identificacion === identificacionUsuarioEditando) {
      usuarioEditado.estado = usuarios[i].estado;
      actualizarSesionUsuario(usuarios[i], usuarioEditado);
      usuarios[i] = usuarioEditado;
    }
  }
}

function rolOcupado(rol) {
  if (rol !== "Administrador" && rol !== "Rectoría" && rol !== "Vicerrectoría") {
    return false;
  }

  let usuarios = obtenerUsuarios();

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].identificacion !== identificacionUsuarioEditando && usuarios[i].rol === rol) {
      return true;
    }
  }
  return false;
}

let camposUsuario = [
  "nombreUsuario",
  "primerApellidoUsuario",
  "segundoApellidoUsuario",
  "identificacionUsuario",
  "correoInstitucional",
  "celularUsuario",
  "correoPersonal",
  "fechaNacimiento",
  "rolUsuario",
  "sexoUsuario",
  "contrasenaUsuario",
  "confirmarContrasena"
];

function limpiarEstadosUsuario() {
  for (let i = 0; i < camposUsuario.length; i++) {
    quitarEstadoCampo(document.getElementById(camposUsuario[i]));
  }
}

if (formularioUsuario !== null) {
  agregarEventosBlur(camposUsuario);
}

function textoBusquedaUsuario() {
  let campo = document.getElementById("buscarUsuario");

  if (campo === null) {
    return "";
  }
  return campo.value.trim().toLowerCase();
}

function coincideUsuario(usuario, texto) {
  let identificacion = (usuario.identificacion || "").toLowerCase();
  let nombre = (usuario.nombre || "").toLowerCase();
  let apellidos = (usuario.apellidos || "").toLowerCase();
  let correo = (usuario.correoInstitucional || "").toLowerCase();

  return identificacion.includes(texto) || nombre.includes(texto) || apellidos.includes(texto) || correo.includes(texto);
}

function mostrarSinResultadosUsuarios(total, encontrados) {
  let aviso = document.getElementById("sinResultadosUsuarios");

  if (aviso === null) {
    return;
  }

  if (total > 0 && encontrados === 0) {
    aviso.classList.remove("oculto");
  } else {
    aviso.classList.add("oculto");
  }
}

if (document.getElementById("buscarUsuario") !== null && formularioUsuario !== null) {
  document.getElementById("buscarUsuario").addEventListener("input", dibujarUsuarios);
}
