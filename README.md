# Sistema de Gestión de Cursos y Desarrollo Curricular

Aplicación web para el Departamento de Desarrollo Curricular y Docente de la Universidad CENFOTEC.

Proyecto final del curso **SOFT-11C1 — Proyecto Integrador 1** · Equipo 4: **IntegraCode**.

## Descripción

El sistema centraliza el registro, la revisión y la aprobación de los cursos de la
universidad. Hoy esa información se maneja en hojas de Excel y documentos independientes
de cada escuela, por lo que no existe una fuente única de la oferta, nada impide códigos
de curso duplicados y no queda registro de quién aprobó cada curso.

La aplicación permite que un Director de Escuela registre un curso con toda su
información y sus adjuntos, lo envíe a revisión, y que Desarrollo Curricular lo valide,
lo apruebe y lo publique. Rectoría y Vicerrectoría consultan la información según su
nivel de acceso. Cada curso mantiene un único estado: **En desarrollo**, **En producción**
o **Inactivo**.

## Alcance funcional

77 requerimientos funcionales y 28 no funcionales, organizados en 8 módulos:

- Autenticación, usuarios y seguridad
- Roles y matriz de permisos
- Gestión de catálogos
- Formulario del curso
- Integración con IA (API de Gemini) para la redacción de textos
- Flujo de trabajo y aprobación, con notificaciones
- Reportes, consultas y filtros (reportes completos en la segunda iteración)
- Interfaz y reglas transversales (español / inglés e identidad institucional)

### Roles del sistema

| Rol | Descripción |
|---|---|
| Administrador | Superusuario; puede ejecutar las acciones de todos los roles |
| Rectoría | Consulta de reportes globales e históricos |
| Vicerrectoría | Consulta de reportes y traslado manual de los cursos aprobados a Power Campus |
| Director de Escuela | Registra y envía los cursos de su escuela |
| Desarrollo Curricular | Revisa, corrige, asigna el código y aprueba los cursos |

## Equipo

| Integrante | Rol en el equipo |
|---|---|
| Mariana Paniagua Porras | Coordinación |
| Paulo Josué Solano Ramírez | Calidad |
| Ian Aarón Mora Espinoza | Soporte |

## Tecnologías

**Primera iteración**

- HTML, CSS y JavaScript nativo, sin frameworks (sin Bootstrap ni jQuery)
- Almacenamiento exclusivo en Local Storage

**Segunda iteración**

- MongoDB como base de datos
- Integración con la API de Gemini y servicio de correo

## Estructura del repositorio

```
/
├── index.html                Inicio de sesión
├── pages/
│   ├── inicio.html           Página de inicio después del login
│   ├── usuarios.html         Registro, lista y búsqueda de usuarios
│   ├── catalogos.html        Catálogos (escuelas, carreras, casas certificadoras,
│   │                         monedas, área SFIA, temáticas, metodologías,
│   │                         certificaciones y niveles de complejidad)
│   ├── curso-formulario.html Registro de cursos
│   ├── cursos.html           Lista, búsqueda y filtros de cursos
│   ├── revision.html         Revisión de cursos (en construcción)
│   └── perfil.html           Perfil del usuario y cambio de avatar
├── css/
│   └── styles.css            Hoja de estilos única
├── js/
│   ├── almacenamiento.js     Lectura y escritura en Local Storage
│   ├── validaciones.js       Validaciones y mensajes compartidos
│   ├── menu.js               Menú lateral y acceso según el rol
│   ├── login.js              Inicio de sesión
│   ├── inicio.js             Página de inicio
│   ├── usuarios.js           Gestión de usuarios
│   ├── catalogos.js          Gestión de catálogos
│   ├── curso-formulario.js   Registro de cursos
│   ├── cursos.js             Lista y búsqueda de cursos
│   └── perfil.js             Perfil del usuario
├── img/                      Logo y avatares (A1 a A10)
├── documentos/               ERS, documento de diseño y wireframes
└── README.md
```

Cada página interna carga primero `almacenamiento.js`, después `menu.js`,
`validaciones.js` (si tiene formularios) y por último el script propio de la página.

## Guía de estilos

La interfaz aplica la identidad institucional de la Universidad CENFOTEC (RF-75).
Como el libro de marca todavía no se ha recibido, la paleta se tomó del logo
oficial. Todos los colores están definidos como variables al inicio de
`css/styles.css`, por lo que se actualizan en un solo lugar cuando llegue el libro.

| Variable | Color | Uso |
|---|---|---|
| `--azul` | #0169E9 | Botones principales, enlaces, pestaña activa y foco |
| `--azul-oscuro` | #01469A | Encabezado, opción activa del menú y hover |
| `--azul-claro` | #EAF2FF | Opción seleccionada (avatares) |
| `--blanco` | #FFFFFF | Contenido, tarjetas y campos |
| `--fondo` | #F4F6F9 | Fondo general, menú lateral y campos de solo lectura |
| `--borde` | #CCCCCC | Bordes de campos, tablas y separadores |
| `--texto` | #333333 | Texto principal |
| `--texto-secundario` | #666666 | Textos de ayuda |
| `--error` | #C62828 | Campos con error y cerrar sesión |
| `--valido` | #2E7D32 | Campos válidos y mensajes de confirmación |
| `--gris-deshabilitado` / `--texto-deshabilitado` | #E0E0E0 / #757575 | Botones deshabilitados |

- **Tipografía:** Arial, Helvetica, sans-serif; 16 px de base, h1 de 28 px, h2 de 22 px y h3 de 18 px.
- **Botones:** principal con fondo azul y texto blanco; secundario blanco con borde azul.
- **Campos:** 40 px de alto, etiqueta siempre encima y mensaje de error debajo del campo.

## Cómo ejecutar

1. Clonar el repositorio.
2. Abrir `index.html` en el navegador (o con la extensión Live Server de VS Code).
3. Ingresar con el administrador inicial:
   - Correo: `admin@ucenfotec.ac.cr`
   - Contraseña: `Admin2026`

Los datos se guardan en el Local Storage del navegador. Para empezar de cero, se
borra desde las herramientas de desarrollador (F12 → Application → Local Storage);
al volver a abrir el inicio de sesión se crea de nuevo el administrador inicial.

## Primera iteración

Se desarrolla en tres sprints de una semana:

| Sprint | Fechas |
|---|---|
| Semana 1 | 12 al 18 de octubre |
| Semana 2 | 19 al 25 de octubre |
| Semana 3 | 26 de octubre al 1 de noviembre |

### Estado del producto

Funcionalidades terminadas en la primera iteración, con datos guardados en Local Storage:

- Inicio y cierre de sesión con control de sesión en todas las páginas; los usuarios inactivos no pueden ingresar.
- Menú y acceso a las páginas según el rol del usuario.
- Usuarios: registro con validaciones, lista y búsqueda por identificación, nombre, apellidos o correo; cambio de estado.
- Escuelas y carreras: registro, lista y búsqueda.
- Catálogos de casas certificadoras, área SFIA, temáticas, metodologías, certificaciones y niveles de complejidad: registro, lista y búsqueda.
- Cursos: formulario de registro completo (con borrador) y lista con búsqueda y filtros por escuela, estado, modalidad y temática.
- Perfil del usuario con cambio de avatar.

En construcción: revisión de cursos y reportes.

**Área SFIA:** la ERS del equipo define este catálogo como «Área SFIA» (código numérico
autogenerado, nombre y descripción opcional), por eso se conserva ese nombre. En el
formulario del curso el área SFIA es opcional.

Quedan para la segunda iteración: la integración con Google y con Gemini, las
notificaciones, la lógica del flujo de aprobación, los reportes, la eliminación de
registros, los filtros avanzados y la importación por CSV.

## Milestones

| # | Entregable | Fecha | Estado |
|---|---|---|---|
| 1 | Especificación de Requerimientos (ERS) | 27 de setiembre | Entregado |
| 2 | Documento de diseño de la primera iteración | 11 de octubre | Entregado |
| 3 | Programación con Local Storage | 12 de octubre al 1 de noviembre | Finalizado |
| 4 | Diseño final y desarrollo conectado a MongoDB | — | Pendiente |

## Documentación

- [Especificación de Requerimientos de Software (ERS)](<documentos/Especificación de requerimientos de software (ERS) - Grupo 4.pdf>)
- [Documento de diseño — Primera iteración](documentos/Documento_Diseno_Iteracion_1_Grupo_4.docx)
- [Wireframes](documentos/Wireframes)
- [Casos de prueba — Primera iteración](documentos/Casos_de_Prueba_Iteracion_1_Grupo_4.pdf) (también en [Word](documentos/Casos_de_Prueba_Iteracion_1_Grupo_4.docx))

## Convenciones del repositorio

- **Nombres de archivo** sin tildes, ñ ni espacios (por ejemplo, `Documento_Diseno_Iteracion_1_Grupo_4.docx`).
- **Una versión por documento:** se reemplaza el mismo archivo y el historial de git conserva las versiones anteriores; no se suben copias como "(2)" o "(3)".
- **Commits** con un prefijo que indique el tipo de cambio: `feat:` para funcionalidades nuevas, `fix:` para correcciones, `docs:` para documentación, `refactor:` para reorganizar código sin cambiar su funcionamiento y `chore:` para tareas de mantenimiento.
- Hacer `git pull` antes de empezar a trabajar y antes de subir cambios.
- Revisar `git status` antes de cada commit y agregar solo los archivos que corresponden (`git add js/usuarios.js`, no `git add .`).
- No usar `git push --force`.

## Convenciones de código

- Todo acceso a Local Storage se hace mediante las funciones de `js/almacenamiento.js`; los demás scripts no usan `localStorage` directamente.
- Las validaciones compartidas (`validarCampo`, `validarFormulario`, `mostrarError`, etc.) están en `js/validaciones.js` y se reutilizan en lugar de duplicarlas.
- Los `id` de los campos y los mensajes de error siguen el documento de diseño.
- Clases CSS en español, en minúscula y con guiones (por ejemplo, `.mensaje-error`).
