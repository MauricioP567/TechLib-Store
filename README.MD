# TechLib Store - API RESTful (Node.js + Express + MySQL)

**Asignatura:** Desarrollo de Aplicaciones Web (IS093A)  
**Semana:** 10  
**Alumno:** [Escribe tu Nombre Completo Aquí]  

##  Descripción del Proyecto
TechLib Store es el backend de una tienda híbrida (electrónicos y libros), desarrollado con **Node.js**, **Express** y **MySQL**. Implementa una arquitectura MVC, un pool de conexiones asíncrono, y una API RESTful completa. Adicionalmente, incluye una interfaz web (frontend) con modo oscuro que consume la API, demostrando el flujo de datos desde el cliente hasta la base de datos.

##  Tecnologías Utilizadas
*   **Node.js** (v20+)
*   **Express.js** (Servidor y rutas)
*   **MySQL** (Base de datos relacional - XAMPP)
*   **mysql2/promise** (Conexión y consultas asíncronas)
*   **EJS** (Motor de plantillas para el panel web)
*   **dotenv** (Gestión de variables de entorno)

---

##  Evidencias del Ejercicio Desarrollado

### 1. Estructura del proyecto, código del controlador y configuración de BD
A continuación se evidencian las carpetas del proyecto (arquitectura MVC), el código del controlador que maneja los endpoints, y el archivo de configuración con el pool de conexiones.

**Estructura de carpetas en VS Code:**
![Estructura del proyecto]()


**Configuración de la base de datos (Pool de conexiones en `server.js` o `db.js`):**
![Configuración BD]()

**Código del controlador (Endpoints y queries a MySQL):**
![Código del controlador]()

### 2. Pruebas en Postman/Insomnia (Status Codes)
Se validó el correcto funcionamiento de la API RESTful mediante herramientas de pruebas HTTP, comprobando las respuestas exitosas y el manejo de errores.

**Respuesta Exitosa (200 OK) - Listado de productos:**
*Petición GET a `/api/productos`.*
![Postman GET 200]()

**Respuesta Exitosa (201 Created) - Creación de producto:**
*Petición POST a `/api/productos` con body en JSON.*
![Postman POST 201]()

**Respuesta de Error (404 Not Found) - Producto inexistente:**
*Petición GET a `/api/productos/999`.*
![Postman GET 404]()

**Respuesta de Error (400 Bad Request) - Validación de datos:**
*Petición POST enviando un precio negativo o campos vacíos.*
![Postman POST 400]()

### 3. Enlace del Repositorio GitHub
Puedes acceder al código fuente completo del proyecto en el siguiente enlace:
 **[Enlace a mi repositorio de GitHub](https://github.com/MauricioP567/TechLib-Store.git)**

> **Nota de seguridad:** Se garantiza que el archivo `.env` (que contiene las credenciales de la base de datos) **NO** se encuentra subido al repositorio, ya que está debidamente configurado en el archivo `.gitignore` para proteger la información sensible.

---

##  Endpoints RESTful Implementados
| Método | Ruta | Descripción | Códigos de Estado |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/productos` | Obtiene todos los productos activos | 200 OK |
| **GET** | `/api/productos/:id` | Obtiene un producto específico | 200 OK, 404 Not Found |
| **POST** | `/api/productos` | Crea un nuevo producto | 201 Created, 400 Bad Request |
| **PUT** | `/api/productos/:id` | Actualiza un producto existente | 200 OK, 404 Not Found |
| **DELETE** | `/api/productos/:id` | Eliminación lógica de un producto | 200 OK, 404 Not Found |

##  Instalación y Ejecución Local
1. Clonar el repositorio.
2. Instalar dependencias: `npm install`
3. Crear un archivo `.env` en la raíz con las credenciales de MySQL.
4. Iniciar MySQL en XAMPP.
5. Ejecutar el servidor: `node server.js`
6. Abrir el navegador en: `http://localhost:3000`