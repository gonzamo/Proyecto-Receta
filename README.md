# 🍰 Aplicación de recetas

## 🧠 JS

Aquí se encuentra la lógica principal del frontend dividida en módulos:

- `api/` → llamadas a la API del backend
- `services/` → lógica intermedia de la aplicación
- `ui/` → manipulación del DOM e interfaz de usuario

---

## 📁 PUBLIC

Contiene los archivos estáticos servidos por Express:

- `index.html` → punto de entrada de la aplicación
- `app.js` → lógica principal del frontend
- otros recursos estáticos

Esta carpeta es la que se expone públicamente mediante Express, en el archivo -> server.js:


app.use(express.static("public"));

---

## DIST/

Esta carpeta se crea gracias a Gulp (comprime todo el código), los archivos dentro de la carpeta son los que están minimizados al máximo para su funcionamiento correcto.

Cada vez que hacemos **npx gulp**, estos se sobreescriben

---

## GULPFILE

Aquí es donde configuramos la forma de comprimir con Gulp

---

## EXPRESS

Framework diseñado para crear servidores web y APIs de forma rápida, minimalista y flexible.

---

## PACKAGE.JSON
Aquí configuramos la base de nuestro proyecto

---

## DOCKERFILE

Aquí se define cómo se construye el entorno del backend usando Docker.

El Dockerfile se encarga de crear una imagen del servidor Node.js, instalar las dependencias necesarias y ejecutar la aplicación dentro de un contenedor aislado..

---

## DOCKER COMPOSE

Archivo que permite levantar toda la aplicación de forma conjunta (backend + base de datos MongoDB).

---

## BACKEND

Contiene la lógica del servidor Express y la conexión a MongoDB:

- `server.js` → punto de entrada del servidor, define los endpoints de la API
- `model/Receta.js` → esquema de datos (nombre, categoria, ingredientes, tiempoPreparacion, receta_hecha, favorita)
- `js/` → módulos del frontend organizados en `api/`, `services/` y `ui/`
- `public/` → archivos estáticos servidos por Express

---

## API ENDPOINTS

| Método | Ruta             | Descripción                |
|--------|------------------|----------------------------|
| GET    | `/recetas`       | Obtener todas las recetas  |
| GET    | `/recetas/:id`   | Obtener una receta por ID  |
| POST   | `/recetas`       | Crear una nueva receta     |
| PUT    | `/recetas/:id`   | Actualizar una receta      |
| DELETE | `/recetas/:id`   | Eliminar una receta        |

---

## MODELO DE DATOS (Receta)

```json
{
  "nombre": "String",
  "categoria": "String",
  "receta_hecha": "Boolean",
  "favorita": "Boolean",
  "tiempoPreparacion": "Number",
  "ingredientes": ["String"]
}
```

---

## TECNOLOGÍAS

- **Node.js** con Express 5
- **MongoDB** + Mongoose 9
- **Gulp** para minificación y bundling
- **Babel** para transpilación ES6+
- **Docker** + Docker Compose para contenerización
- **Nodemon** para recarga automática en desarrollo

---

## CÓMO EJECUTAR

### Local (sin Docker)

```bash
# Backend
cd backend
npm install
npm run start     # o npm run dev (con nodemon)

# Frontend (minificación con Gulp)
npm install
npx gulp
```

### Con Docker

```bash
docker compose up --build
```

El servidor se levanta en `http://localhost:3000`.

---

## VARIABLES DE ENTORNO

| Variable    | Valor por defecto                      |
|-------------|----------------------------------------|
| `MONGO_URL` | `mongodb://mongo:27017/recetas` (Docker) |

---

## SCRIPTS

| Script            | Descripción                              |
|-------------------|------------------------------------------|
| `npm run start`   | Inicia el servidor (backend)             |
| `npm run dev`     | Inicia con Nodemon (backend)             |
| `npx gulp`        | Minifica JS y CSS a la carpeta `dist/`   |
