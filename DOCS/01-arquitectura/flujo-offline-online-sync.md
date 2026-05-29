# Flujo offline / online y sincronización

**Principio:** el evento funciona siempre, con o sin internet. La subida a la web es asíncrona y
"best effort". Nada del flujo en directo (captura, montaje, impresión, QR local) espera a la red.

## Estados de conectividad

- **Online:** hay acceso a la API. Los elementos de la cola se procesan en segundo plano.
- **Offline:** sin acceso. Todo se guarda en disco + SQLite; la cola crece y espera.

La detección combina: estado de red del SO + *ping* periódico a un endpoint de salud de la API
(`GET /health`). No se confía solo en "hay wifi" porque la red del local puede no tener salida.

## La cola de sincronización

Tabla `sync_queue` (ver [modelo de datos](modelo-datos-local.md)). Cada elemento:

```
{ id, kind: photo|gif|video|email, ref_id, payload, status, attempts, last_error }
```

Ciclo de vida: `pending → uploading → done` (o `error` y reintento).

### Encolado
- Tras cada sesión: se encolan los `singles`/`layout`/`gif` para subir (RF-060/061).
- Al pedir email: se encola un item `email` con destino y referencia (RF-063).
- Las confesiones se encolan como `video`.

### Procesado
1. Un *worker* en el proceso main observa la cola cuando hay conexión.
2. Toma los `pending` por orden, marca `uploading`, llama a la API ([endpoints](../04-backend-api/endpoints-api.md)).
3. Éxito → `done` + se guarda `remote_id`/URL. Fallo → `error`, `attempts++`, se reintenta con **backoff exponencial** (p. ej. 5s, 30s, 2min, 10min, máx).
4. La cola **persiste**: sobrevive a reinicios y cortes (RNF-008).

### QR y conexión
- El QR apunta a la URL pública del medio en la web. Si la foto **aún no se ha subido**, hay dos estrategias:
  - **A (recomendada):** el QR codifica una URL determinista (`/g/<eventCode>/<sessionCode>`) que existirá en cuanto la subida termine; mientras tanto muestra "preparando tus fotos".
  - **B:** no mostrar QR hasta que la subida concrete (peor experiencia en eventos sin red).
- Se documenta A para no bloquear al invitado por falta de wifi.

## Idempotencia y deduplicado

- Cada medio lleva un identificador estable (uuid local) que se envía a la API; reenvíos no duplican (la API hace *upsert* por ese id).
- Si un reintento sube algo ya subido, la API responde con el recurso existente.

## Resolución de conflictos

- El flujo es **append-only** (se crean fotos/sesiones; no se editan en la web). No hay edición concurrente del mismo recurso, así que el conflicto es mínimo.
- Los ajustes del evento se gestionan localmente; si se editan también en la web, gana la última escritura con marca de tiempo (poco frecuente).

## Garantías

| Garantía | Cómo |
|----------|------|
| No se pierde ninguna foto sin red | Original a disco + fila SQLite antes de cualquier subida |
| La subida acaba ocurriendo | Cola persistente + reintentos con backoff |
| No se duplica en la web | uuid estable + upsert idempotente en API |
| El invitado no espera a la red | UI no bloquea; QR con URL determinista |
