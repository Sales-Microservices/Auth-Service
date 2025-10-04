# Auth Microservice

## Dev

1. Clonar el repositorio
2. Instalar dependencias
3. Crear una base de datos en MongoDB:
   - Acceder a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) o usar una instancia local de MongoDB
   - Crear una nueva base de datos
   - Obtener la cadena de conexión (connection string)
4. Crear un archivo `.env` basado en el `env.template`
   - Configurar la variable `DATABASE_URL` con tu connection string de MongoDB
   - Ejemplo: `DATABASE_URL="mongodb+srv://usuario:password@cluster.mongodb.net/nombre-db"`
5. Ejecutar migración de prisma 
```bash
   npx prisma migrate dev