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
