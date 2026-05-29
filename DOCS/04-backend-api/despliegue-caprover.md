# Despliegue en CapRover

La infraestructura vive en **CapRover** (`captain.cp.c2developers.com`), donde ya está la web DecaBox.
Aquí se añaden la BBDD `decabox-bbdd`, el servicio API `decabox-api` y (opcional) el almacén MinIO.

## 1. Crear la BBDD `decabox-bbdd` (PostgreSQL)

1. En el panel CapRover → **Apps** → **One-Click Apps/Databases** → **PostgreSQL**.
2. Nombre de la app: `decabox-bbdd`.
3. Fijar usuario y contraseña (guardar en gestor de secretos).
4. CapRover crea el contenedor con un **volumen persistente** para los datos.
5. La cadena de conexión interna será del tipo:
   `postgres://<user>:<pass>@srv-captain--decabox-bbdd:5432/<db>`
   (las apps internas se referencian por `srv-captain--<nombre>`).

## 2. Servicio API `decabox-api`

1. Crear una **App** nueva en CapRover: `decabox-api`.
2. Habilitar **HTTPS** y dominio (p. ej. `api.decabox.<dominio>` o subdominio de captain).
3. Variables de entorno (App Configs → Environmental Variables):
   ```
   DATABASE_URL=postgres://<user>:<pass>@srv-captain--decabox-bbdd:5432/<db>
   JWT_SECRET=<secreto-largo>
   RESEND_API_KEY=<clave-resend>
   STORAGE_DRIVER=fs            # o s3
   STORAGE_PATH=/data/media     # si fs (volumen persistente)
   PUBLIC_BASE_URL=https://api.decabox.<dominio>
   ```
4. Añadir **volumen persistente** si `STORAGE_DRIVER=fs` (p. ej. `/data/media`).
5. Desplegar con `captain-definition` + `Dockerfile` (igual patrón que la web). Métodos: `caprover deploy`, tarball, o Git.
6. Ejecutar **migraciones** de Prisma/Drizzle en el arranque o como paso de deploy.

### `captain-definition` (ejemplo)
```json
{ "schemaVersion": 2, "dockerfilePath": "./Dockerfile" }
```

### `Dockerfile` (esquema)
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app ./
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

## 3. Almacén de medios (opcional MinIO)

- Si se opta por S3: desplegar **MinIO** como One-Click App, crear bucket `decabox-media`, y configurar `STORAGE_DRIVER=s3` + credenciales en `decabox-api`.
- Si se usa volumen: basta el volumen persistente del paso 2.

## 4. Web DecaBox

- La web (`decabox-web`) se reconfigura para leer de la API: variable `NEXT_PUBLIC_API_URL=https://api.decabox.<dominio>` y cambio de `output: 'export'` según estrategia. Ver [cambios frontend](../05-web-decabox/cambios-frontend.md).

## Backups

- **PostgreSQL:** `pg_dump` periódico (cron/CapRover) a almacenamiento seguro.
- **Medios:** copia del volumen `/data/media` o versionado del bucket MinIO.
- Documentar restauración. Ver [mantenimiento y backups](../08-operativa/mantenimiento-y-backups.md).

## Checklist de despliegue

- [ ] `decabox-bbdd` creada y accesible internamente.
- [ ] `decabox-api` desplegada con HTTPS y variables de entorno.
- [ ] Migraciones aplicadas; `GET /health` responde 200.
- [ ] Almacén configurado (volumen o MinIO) y escritura verificada.
- [ ] Token de dispositivo emitido para la app fotomatón.
- [ ] Web apuntando a la API.
- [ ] Backups programados.
