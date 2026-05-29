# Autenticación y roles

La API distingue dos tipos de cliente: el **dispositivo fotomatón** (la app) y el **administrador**
(gestión de contenido/eventos). Las galerías públicas usan **acceso por código**, no login.

## Roles

| Rol | Quién | Puede |
|-----|-------|-------|
| **device** | App de escritorio del fotomatón | Crear eventos/sesiones, subir medios, enviar emails |
| **admin** | Daian / gestor web | CRUD de tipos de evento, gestionar eventos, borrar medios (RGPD) |
| **público (por código)** | Invitados con el QR/enlace | Ver/descargar medios de su galería |

## Mecanismo: JWT

- La API emite **JWT** firmados (secreto en variable de entorno).
- **Dispositivo:** se registra una vez (alta manual o con clave de aprovisionamiento) y obtiene un **token de dispositivo** de larga duración (o un refresh). El hash se guarda en `devices.token_hash`.
- **Admin:** login con credenciales → JWT de sesión corto + refresh.
- Cada petición protegida lleva `Authorization: Bearer <jwt>`; un middleware valida firma, expiración y rol.

## Aprovisionamiento del dispositivo

1. El operador da de alta el dispositivo (nombre) en la API/admin → genera un token.
2. El token se introduce una vez en la app ([ajustes → compartir/conectividad](../02-app-escritorio/pantalla-ajustes.md)).
3. La app lo guarda de forma segura (almacenamiento cifrado del SO / `safeStorage` de Electron) y lo usa en cada subida.

## Acceso público por código

- Las galerías se sirven por `/(g)/:eventCode/:sessionCode` con códigos **no adivinables** (aleatorios, suficientemente largos).
- No requieren login para no fastidiar al invitado, pero **no son listables ni indexables** y pueden **caducar** (`gallery_expires_at`).
- Opción de PIN por evento si se quiere una capa extra.

## Buenas prácticas

| Aspecto | Medida |
|---------|--------|
| Transporte | HTTPS obligatorio |
| Secretos | En variables de entorno de CapRover, nunca en cliente/repo |
| Tokens de dispositivo | Revocables (`devices.active=false`) |
| Rotación | Posibilidad de regenerar token de dispositivo |
| Rate limiting | Limitar `/media/:id/email` y endpoints públicos |
| Validación | Esquemas en todas las entradas |

Relacionado: [endpoints](endpoints-api.md) · [privacidad](../01-arquitectura/seguridad-y-privacidad.md) · [despliegue](despliegue-caprover.md).
