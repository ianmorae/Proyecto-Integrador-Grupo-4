// app.js: configura y arranca la API.
require('dotenv').config({ quiet: true });

const express = require('express');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuarios.routes');
const casasCertificadorasRoutes = require('./routes/casasCertificadoras.routes');
const rutaNoEncontrada = require('./middlewares/rutaNoEncontrada');
const manejarErrores = require('./middlewares/manejarErrores');

const app = express();

// 1. Permite las peticiones del frontend.
// credentials se usará más adelante, con el inicio de sesión.
app.use(cors({ origin: process.env.ORIGEN_FRONTEND, credentials: true }));

// 2. Lee el JSON que envía el frontend y lo deja en req.body.
app.use(express.json());

// 3. Ruta de prueba: confirma que la API responde.
app.get('/api/v1', (req, res) => {
  res.json({ mensaje: 'API del Sistema de Gestión Curricular funcionando' });
});

// 4. Conecta cada grupo de URL con sus rutas.
app.use('/api/v1/usuarios', usuariosRoutes);
app.use('/api/v1/casasCertificadoras', casasCertificadorasRoutes);

// 5. Responde las URL que no existen y los errores. Van al final.
app.use(rutaNoEncontrada);
app.use(manejarErrores);

// 6. Inicia el servidor.
const puerto = process.env.PORT || 4000;

app.listen(puerto, () => {
  console.log(`API en http://localhost:${puerto}`);
});
