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
├── documentos/   Documentación del proyecto (ERS y documento de diseño)
├── index.html    Inicio de sesión
├── pages/        Demás páginas del sistema
├── css/          Hoja de estilos (styles.css)
├── js/           Scripts de validación
├── img/          Imágenes y recursos
└── README.md
```

Las carpetas de código se crean durante la programación de la primera iteración.

## Milestones

| # | Entregable | Fecha | Estado |
|---|---|---|---|
| 1 | Especificación de Requerimientos (ERS) | 27 de setiembre | Entregado |
| 2 | Documento de diseño de la primera iteración | 11 de octubre | En curso |
| 3 | Programación con Local Storage | 12 de octubre al 1 de noviembre | Pendiente |
| 4 | Diseño final y desarrollo conectado a MongoDB | — | Pendiente |

## Documentación

- [Especificación de Requerimientos de Software (ERS)](<documentos/Especificación de requerimientos de software (ERS) - Grupo 4.pdf>)
- [Documento de diseño — Primera iteración](documentos/Documento_Diseno_Iteracion_1_Grupo_4.docx)

## Convenciones del repositorio

- **Nombres de archivo** sin tildes, ñ ni espacios (por ejemplo, `Documento_Diseno_Iteracion_1_Grupo_4.docx`).
- **Una versión por documento:** se reemplaza el mismo archivo y el historial de git conserva las versiones anteriores; no se suben copias como "(2)" o "(3)".
- **Commits** con un prefijo que indique el tipo de cambio: `docs:` para documentación, `feat:` para funcionalidades nuevas y `fix:` para correcciones.
- Revisar `git status` antes de cada commit y agregar solo los archivos que corresponden.