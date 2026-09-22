# Sistema de Gestión de Cursos y Desarrollo Curricular

Aplicación web para el Departamento de Desarrollo Curricular y Docente de la Universidad CENFOTEC.

Proyecto final del curso **SOFT-11C1 — Proyecto Integrador 1**.

## Descripción

El sistema centraliza el registro, la revisión y la aprobación de los cursos de la
universidad. Hoy ese proceso se lleva por fuera del sistema, entre correos y archivos
sueltos, lo que dificulta saber en qué estado está cada curso y quién debe actuar.

La aplicación permite que un Director de Escuela registre un curso con toda su
información y sus adjuntos, lo envíe a revisión, y que Desarrollo Curricular, Rectoría
y Vicerrectoría den seguimiento al flujo hasta que el curso pasa a producción. Cada
curso mantiene un único estado: **En desarrollo**, **En producción** o **Inactivo**.

## Alcance funcional

55 requerimientos funcionales distribuidos en 8 módulos:

- Autenticación con Google y con usuario/contraseña
- Gestión de usuarios y roles
- Catálogos del sistema
- Registro y edición de cursos
- Flujo de aprobación y cambio de estado
- Asistencia con IA (Gemini) para la redacción de textos
- Notificaciones por correo y del sistema operativo
- Reportes (segunda iteración)
- Interfaz multi-idioma español / inglés

### Roles del sistema

| Rol | Descripción |
|---|---|
| Administrador | Superusuario; puede ejecutar las acciones de todos los roles |
| Rectoría | Consulta y seguimiento institucional |
| Vicerrectoría | Consulta y traslado de la información aprobada |
| Director de Escuela | Registra y envía los cursos de su escuela |
| Desarrollo Curricular | Revisa los cursos y asigna el código |

## Equipo

| Integrante | Rol en el equipo |
|---|---|
| Mariana Paniagua Porras | Coordinación |
| Paulo Josué Solano Ramírez | Calidad |
| Ian Aarón Mora Espinoza | Soporte |

## Tecnologías

**Primera iteración**

- HTML, CSS y JavaScript
- Almacenamiento exclusivo en Local Storage

**Segunda iteración**

- MongoDB como base de datos
- Integración con la API de Gemini y servicio de correo

## Estructura del repositorio

```
/
├── docs/        Documentación del proyecto (ERS, catálogo de requerimientos, wireframes)
├── src/         Código fuente de la aplicación
│   ├── css/
│   ├── js/
│   └── pages/
└── assets/      Imágenes, íconos y recursos estáticos
```

## Milestones

| # | Entregable | Fecha |
|---|---|---|
| 1 | Especificación de Requerimientos (ERS) | 21 al 27 de setiembre |
| 2 | Análisis y diseño v1: wireframes y estructura del repositorio | — |
| 3 | Programación con Local Storage | 12 de octubre al 1 de noviembre |
| 4 | Diseño final y desarrollo conectado a MongoDB | — |

## Documentación

La documentación del proyecto se mantiene en la carpeta `docs/`. El documento vigente
del catálogo de requerimientos es `Catalogo_requerimientos_SOFT11C1.pdf`.
