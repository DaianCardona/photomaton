# Almacenamiento de medios

Las fotos, GIFs y vídeos subidos por el fotomatón se guardan en un **almacén de binarios** y se
referencian desde PostgreSQL (`media.storage_key` / `public_url`).

## Opciones

| Opción | Descripción | Pros | Contras |
|--------|-------------|------|---------|
| **Volumen CapRover** | Carpeta persistente montada en `decabox-api` | Simple, sin servicios extra | No escala a varios nodos; backups manuales |
| **MinIO (S3) en CapRover** | Servicio S3-compatible auto-alojado | URLs firmadas, escalable, estándar S3 | Un servicio más que mantener |
| **S3 externo / R2** | Bucket en proveedor cloud | Robusto, CDN fácil | Servicio externo (coste, datos fuera) |

**Recomendación:** empezar con **volumen CapRover** (rápido de montar) y migrar a **MinIO** cuando crezca el volumen o se quieran URLs firmadas y subida directa de vídeos. El adaptador de almacenamiento abstrae ambos.

## Adaptador de almacenamiento

`src/storage/` expone una interfaz para no acoplar la API a un proveedor:

```ts
interface MediaStorage {
  put(key: string, data: Buffer | Stream, contentType: string): Promise<void>;
  getSignedUploadUrl?(key: string, contentType: string): Promise<string>;
  publicUrl(key: string): string;
  delete(key: string): Promise<void>;
}
```

Implementaciones: `FsStorage` (volumen), `S3Storage` (MinIO/R2/S3).

## Organización de claves (key)

```
events/<eventCode>/sessions/<sessionCode>/<kind>/<mediaId>.<ext>
ej: events/AB12/sessions/CD34/layout/9f3...e1.jpg
```

- Estructura espejo de la galería para resolver por URL fácilmente.
- `kind`: single | layout | gif | video | confession.

## Servido y URLs

- **Volumen:** servir estáticos detrás de nginx/Fastify con cabeceras de caché; acceso controlado por código de galería.
- **MinIO/S3:** `publicUrl` o **URL firmada** con caducidad para descargas.
- Las URLs públicas se guardan en `media.public_url`; el **QR** del invitado apunta a la galería (`/g/...`), no directamente al binario, para poder aplicar control de acceso y caducidad.

## Tamaños y formatos

| Medio | Formato | Tamaño orientativo |
|-------|---------|--------------------|
| Single / layout | JPG | 0.5–3 MB |
| GIF | GIF/MP4 | 1–8 MB |
| Confesión / vídeo | MP4 | 10–100+ MB |

- Para vídeos grandes: **URL firmada** + subida directa (no pasar por la API).
- Generar **miniaturas** (thumbnails) para la galería (sharp en la API o en la app antes de subir).

## Retención y limpieza

- Política por evento (caducidad de galería) → job que borra medios caducados (RGPD).
- Limpieza coordinada: borrar en almacén **y** en BBDD. Ver [privacidad](../01-arquitectura/seguridad-y-privacidad.md) y [mantenimiento](../08-operativa/mantenimiento-y-backups.md).
