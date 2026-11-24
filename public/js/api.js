// api.js: el único archivo del frontend que se comunica con la API.
// La API es la otra aplicación del proyecto: la que guarda los datos en MongoDB.

// Dirección de la API: /api, como en el curso, y la versión /v1 del documento de diseño.
// Al publicar, solo cambia esta dirección.
const URL_API = 'http://localhost:4000/api/v1';

// Envía una petición a la API y devuelve los datos de la respuesta.
// metodo: 'GET', 'POST', 'PUT', 'PATCH' o 'DELETE'
// ruta: el final de la dirección, por ejemplo '/usuarios'
// datos: el objeto que se envía; solo con POST, PUT y PATCH
async function pedirApi(metodo, ruta, datos) {
  // 1. Prepara las opciones de la petición.
  // credentials: 'include' envía la cookie de la sesión en cada petición.
  const opciones = { method: metodo, headers: {}, credentials: 'include' };
  if (datos !== undefined) {
    opciones.headers['Content-Type'] = 'application/json';
    opciones.body = JSON.stringify(datos);
  }

  // 2. Envía la petición y espera la respuesta.
  let respuesta;
  try {
    respuesta = await fetch(URL_API + ruta, opciones);
  } catch (error) {
    throw new Error('No se pudo conectar con la API');
  }

  // 3. Convierte el cuerpo de la respuesta en un objeto.
  // Si el cuerpo no es JSON, usa un objeto vacío.
  const contenido = await respuesta.json().catch(() => ({}));

  // 4. Sin sesión (401): desde una página interna, vuelve al inicio de sesión.
  if (respuesta.status === 401 && window.location.pathname.includes('/pages/')) {
    window.location.href = '../index.html';
  }

  // 5. Si la API respondió con un error, lo lanza con su mensaje.
  if (!respuesta.ok) {
    const error = new Error(contenido.mensaje || 'Ocurrió un error');
    error.estado = respuesta.status;
    throw error;
  }
  return contenido;
}
