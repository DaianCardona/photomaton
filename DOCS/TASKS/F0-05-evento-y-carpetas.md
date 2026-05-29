# F0-05 · Crear/abrir evento + carpetas estándar

**Fase:** 0 · Cimientos
**Depende de:** F0-03, F0-04
**Estimación:** M (1 día)
**Cubre:** RF-001, RF-002

## Objetivo
Permitir crear un evento (nombre + fecha) que genere automáticamente su **carpeta** con las subcarpetas
estándar, y listar/reabrir eventos existentes, según
[estructura-carpetas-evento](../02-app-escritorio/estructura-carpetas-evento.md).

## Subtareas
- [ ] Servicio `storage/fs/` para crear la carpeta del evento con patrón `Nombre del evento_DD.MM.AA`.
- [ ] Crear subcarpetas: `plantillas/`, `originales/`, `layout/`, `gifs/`, `videos/`, `confesiones/`, `greenscreen/`.
- [ ] Normalizar/saneear el nombre (caracteres no válidos en Windows) y permitir sufijo libre.
- [ ] Persistir el evento en SQLite (`events`, con `folder_path`) vía `EventsRepo`.
- [ ] Configurar **carpeta base** de eventos (por defecto una ruta de la app; configurable en ajustes — enlaza con F0-06).
- [ ] UI (renderer): formulario "Nuevo evento" + lista de eventos existentes con opción de abrir.
- [ ] Reabrir evento: cargar sus datos y fijarlo como evento activo.
- [ ] Gestionar colisiones (carpeta ya existente) sin destruir datos.
- [ ] Tests del generador de carpetas/nombres.

## Criterios de aceptación
- Crear un evento genera la carpeta con **las 7 subcarpetas** y una fila en `events`.
- El nombre de carpeta sigue el patrón y es válido en Windows.
- La lista muestra los eventos y permite reabrir uno (queda como activo).
- No se sobrescriben datos si la carpeta ya existe (se avisa / se reutiliza).

## Referencias
- [estructura-carpetas-evento](../02-app-escritorio/estructura-carpetas-evento.md)
- [modelo-datos-local](../01-arquitectura/modelo-datos-local.md) (`events`)
- [casos-de-uso](../00-vision/casos-de-uso.md) (CU-01)

## Notas
- La carpeta base por defecto puede apuntar a la zona de trabajo del usuario (p. ej. `…\DECABOX FOTOMATÓN\FOTOS EVENTOS\`) o a una dedicada de la app; debe ser configurable.
- Reconciliación con la nomenclatura de dslrbooth está documentada (no se implementa exportación en Fase 0).
