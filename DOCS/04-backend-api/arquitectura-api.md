# Arquitectura de la API

Servicio backend propio en **CapRover** que (1) sirve el contenido de eventos a la web DecaBox y
(2) recibe las subidas del fotomatón y expone las galerías públicas.

## Componentes en CapRover

```
captain.cp.c2developers.com
├── decabox-web        (Next.js → nginx)  ← ya existe; pasará a consumir la API
├── decabox-api        (Node/Fastify)     ← NUEVO
├── decabox-bbdd       (PostgreSQL)        ← NUEVO (one-click app)
└── (almacén medios)   volumen / MinIO     ← NUEVO (ver almacenamiento)
```

## Responsabilidades de la API

| Dominio | Funciones |
|---------|-----------|
| **Contenido web** | CRUD de tipos de evento (bodas, comuniones…) en es/fr/eu para la web (RF-080/081) |
| **Eventos del fotomatón** | Crear/identificar eventos, asociar medios |
| **Ingesta de medios** | Recibir fotos/gifs/vídeos del fotomatón (RF-083), almacenar y registrar |
| **Galerías públicas** | Servir galería por evento con acceso por código (RF-082) |
| **Email** | Enviar foto/gif por email vía Resend (RF-063) |
| **Salud** | `GET /health` para que la app detecte conectividad |

## Stack

- **Node 18+** + **Fastify** (validación de esquemas integrada, rendimiento) — o Express si se prefiere familiaridad.
- **PostgreSQL** vía **Prisma** o **Drizzle** (migraciones versionadas).
- **Resend** para email.
- **JWT** para autenticación (dispositivo fotomatón + admin). Ver [auth](autenticacion-y-roles.md).
- Almacenamiento de binarios en volumen CapRover o MinIO (S3). Ver [almacenamiento](almacenamiento-medios.md).

## Estructura del servicio

```
decabox-api/
├── src/
│   ├── server.ts            ← arranque Fastify, plugins
│   ├── routes/
│   │   ├── health.ts
│   │   ├── event-types.ts   ← contenido web (es/fr/eu)
│   │   ├── events.ts        ← eventos del fotomatón
│   │   ├── media.ts         ← ingesta y servido de medios
│   │   ├── gallery.ts       ← galería pública por código
│   │   └── email.ts         ← envío vía Resend
│   ├── db/                  ← cliente Prisma/Drizzle + migraciones
│   ├── storage/             ← adaptador FS/S3
│   ├── auth/                ← JWT, middlewares
│   └── lib/
├── prisma/ (o drizzle/)     ← esquema y migraciones
├── Dockerfile
├── captain-definition
└── package.json
```

## Flujo de ingesta (resumen)

```
App fotomatón ──(JWT dispositivo)──► POST /events/:id/media (multipart o URL firmada)
        │                                   │
        │                                   ├─ guarda binario en almacén
        │                                   └─ inserta fila media (upsert por uuid)
        ▼
   marca item de la cola como done; guarda URL pública
        │
        ▼
   QR del invitado apunta a /g/:eventCode/:sessionCode (galería pública)
```

Ver [endpoints](endpoints-api.md), [esquema BBDD](esquema-bbdd.md), [despliegue](despliegue-caprover.md).
