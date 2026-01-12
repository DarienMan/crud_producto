## 🚀 Opciones de Ejecución

Puedes ejecutar este proyecto de dos formas:

1. **🐳 Con Docker** (Recomendado - más fácil)
2. **💻 Ejecución Local** (Requiere configuración manual)

---

## 🐳 Opción 1: Ejecución con Docker

### 1. Clonar el proyecto

Abre tu terminal (**PowerShell** o **Git Bash**) y ejecuta:

PowerShell

```
git clone <url-del-repositorio>
cd prueba

```

### 2. Levantar los servicios

Ejecuta el siguiente comando para construir las imágenes y encender la base de datos, el backend y el frontend:

PowerShell

```
docker-compose up --build

```

> **Nota:** La primera vez puede tardar unos minutos mientras descarga las dependencias. Si ves que el backend dice "Connected to Database", ¡ya estás listo!

---

## 💻 Opción 2: Ejecución Local

### Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v16 o superior) - [Descargar aquí](https://nodejs.org/)
- **MySQL** (v8 o superior) - [Descargar aquí](https://dev.mysql.com/downloads/mysql/)
- **npm** (viene con Node.js)

### 1. Clonar el proyecto

```powershell
git clone <url-del-repositorio>
cd prueba
```

### 2. Configurar la Base de Datos

1. Inicia MySQL y crea una base de datos:

```sql
CREATE DATABASE prueba_db;
```

2. Crea un archivo `.env` en la carpeta `backend/` con la siguiente configuración:

```env
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/prueba_db"
PORT=3000
```

> Reemplaza `usuario` y `contraseña` con tus credenciales de MySQL.

### 3. Configurar el Backend

```powershell
# Navegar a la carpeta del backend
cd backend

# Instalar dependencias
npm install

# Generar el cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# Iniciar el servidor (modo desarrollo)
npm run dev
```

El backend estará corriendo en [http://localhost:3000](http://localhost:3000)

### 4. Configurar el Frontend

Abre una **nueva terminal** y ejecuta:

```powershell
# Desde la raíz del proyecto, navegar al frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar la aplicación React
npm start
```

El frontend se abrirá automáticamente en [http://localhost:3001](http://localhost:3001)

### 5. Variables de Entorno (Frontend - Opcional)

Si necesitas cambiar la URL del backend, crea un archivo `.env` en `frontend/` con:

```env
REACT_APP_API_URL=http://localhost:3000
```

---

## 🔗 Enlaces de Acceso

Una vez que Docker termine podra ingresar al programa:

**Servicio**

**Frontend**

[http://localhost:3001]

Interfaz de usuario (React)

**Backend API**

[http://localhost:3000/api]

Endpoints de la aplicación

**Health Check**

[http://localhost:3000/health]

Verificar si el servidor está vivo

---

## 🧪 ¿Cómo probar que todo funciona?

Para confirmar que la aplicación está operativa, sigue este flujo básico en el navegador:

1.  **Entra al Frontend:** Ve a [http://localhost:3001](https://www.google.com/search?q=http://localhost:3001).
2.  **Crea un producto:** Dale al botón **"Crear Producto"**, llena los datos y guarda. Debería aparecer de inmediato en la tabla.
3.  **Edita y Filtra:** \* Haz clic en el icono de **lápiz (✏️)** para cambiar el nombre o precio.

    - Usa la **barra de búsqueda** para filtrar por categoría.

4.  **Paginación:** Si tienes muchos productos, verifica que puedes navegar entre páginas o cambiar cuántos ves por fila.
5.  **Elimina:** Haz clic en el icono de **basura (🗑️)** y confirma que el producto desaparezca de la lista.
