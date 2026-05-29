# F0-04 · Persistencia local SQLite + migraciones + repos

**Fase:** 0 · Cimientos
**Depende de:** F0-01
**Estimación:** M (1–2 días)

## Objetivo
Implementar la base de datos local **SQLite** en el proceso main, con migraciones versionadas y una
capa de repositorios, según [modelo-datos-local](../01-arquitectura/modelo-datos-local.md). En Fase 0 se
crean al menos las tablas necesarias para eventos y ajustes; el resto puede quedar en migración inicial.

## Subtareas
- [ ] Añadir **better-sqlite3** (o equivalente) al proceso main.
- [ ] Ubicar el fichero de BBDD en `app.getPath('userData')`.
- [ ] Implementar un **runner de migraciones** versionado (tabla `schema_migrations`).
- [ ] Migración inicial con las tablas del modelo: `app_settings`, `events`, `templates`, `sessions`, `photos`, `confessions`, `print_jobs`, `sync_queue`.
- [ ] Capa de **repos** (`storage/db/`): `EventsRepo`, `SettingsRepo` (mínimo para Fase 0), con métodos CRUD básicos.
- [ ] Exponer operaciones necesarias por **IPC** (crear/listar evento, leer/guardar ajustes) usando el contrato de F0-03.
- [ ] Manejo de errores y transacciones (escrituras atómicas).
- [ ] Tests unitarios de repos con una BBDD temporal.

## Criterios de aceptación
- Al primer arranque se crea la BBDD y se aplican las migraciones.
- Reabrir la app conserva los datos (eventos, ajustes).
- Los repos permiten crear y leer un evento y leer/guardar ajustes.
- Las migraciones son idempotentes y versionadas (no se reaplican).
- Tests de repos en verde.

## Referencias
- [modelo-datos-local](../01-arquitectura/modelo-datos-local.md) (esquema completo)
- [estructura-proyecto](../01-arquitectura/estructura-proyecto.md) (`storage/db/`)

## Notas
- better-sqlite3 es **síncrono y nativo**: cuidar el rebuild para Electron (electron-rebuild) y la inclusión del binario en el empaquetado (relación con F0-02).
- Mantener el esquema alineado con el de la API (PostgreSQL) para facilitar la sync futura (Fase 2).
