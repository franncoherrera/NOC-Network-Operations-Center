# NOC-Network-Operations-Center

## Descripción

Este proyecto permite registrar logs en tres fuentes de datos distintas de manera simultánea:
- Sistema de archivos (FileSystem)
- Base de datos MongoDB
- Base de datos PostgreSQL

## Funcionalidades principales:

- Registro de logs: Los logs se almacenan en las tres fuentes de datos mencionadas para garantizar redundancia y facilidad de acceso.
- Obtención de logs
- Envío de logs por email: Se incluye la funcionalidad para enviar los archivos de logs por correo electrónico utilizando el servicio de Gmail.

## Tecnologías utilizadas:

- Prisma (PostgreSQL)
- Mongoose (MongoDB)
- Nodemailer (Correo)
- cron (Tareas programadas)
- TypeScript

## Pasos a seguir

1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno
3. Ejecutar el comando ```npm install```
4. Levantar las bases de datos con el comando
   ```
   docker compose up -d
   ```
5. Ejecutar ```npm run dev```


## Obtener Gmail Key
[Google AppPasswords](https://myaccount.google.com/u/0/apppasswords)
