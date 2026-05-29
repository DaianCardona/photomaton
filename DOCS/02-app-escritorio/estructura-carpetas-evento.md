# Estructura de carpetas por evento

Cubre RF-001. Al crear un evento, la app genera automáticamente una carpeta con su nombre y fecha, y
dentro las subcarpetas estándar. Esto reproduce y ordena el flujo que el usuario ya tiene a mano.

## Carpeta del evento

Patrón de nombre: **`Nombre del evento_DD.MM.AA`**
Ejemplo: `Lucia y Sergio_31.05.25`

> Coincide con la nomenclatura real del usuario (p. ej. `Lucia y Sergio 31.05.25 - SARASA -`).
> La app usa un patrón normalizado y permite añadir sufijo libre (apellidos, localidad).

## Subcarpetas (nomenclatura del proyecto)

```
Lucia y Sergio_31.05.25/
├── plantillas/     ← plantilla(s) usada(s) en el evento (PNG + spec)
├── originales/     ← fotos tal cual salen de la cámara (nunca se modifican)
├── layout/         ← montajes finales sobre la plantilla, listos para imprimir
├── gifs/           ← GIFs (y MP4 cortos) de sesiones con 2+ fotos
├── videos/         ← vídeos varios
├── confesiones/    ← clips de vídeo-confesión
└── greenscreen/    ← capturas con croma / recursos de fondo (opcional)
```

## Mapeo con el flujo actual (dslrbooth)

El usuario hoy tiene esta estructura por evento con dslrbooth. Equivalencia:

| dslrbooth (actual) | App DecaBox (nuevo) | Notas |
|--------------------|---------------------|-------|
| `Originals/` | `originales/` | Fotos RAW/JPG sin procesar |
| `Singles/` | (dentro de `originales/` o subcarpeta `singles/`) | Fotos individuales procesadas |
| `Prints/` | `layout/` | Montaje final que se imprime |
| `Animated/` | `gifs/` | GIF/MP4 de la secuencia |
| `GreenScreen/` | `greenscreen/` | Croma |
| `Videos/` | `videos/` | Vídeo |
| `Templates/`, `Settings/*.lcfg` | `plantillas/` + SQLite | Config y plantillas |

> Decisión: mantener los nombres en **español** pedidos por el usuario (`plantillas/originales/layout/gifs/videos`)
> y añadir `confesiones/` y `greenscreen/`. Se puede ofrecer un modo de exportación con nombres "estilo dslrbooth"
> si se necesita compatibilidad puntual.

## Carpeta base

- La carpeta base donde se crean los eventos es configurable en [ajustes](pantalla-ajustes.md) (por defecto, una ruta tipo `…\DECABOX FOTOMATÓN\FOTOS EVENTOS\` o una dedicada de la app).
- La ruta absoluta del evento se guarda en `events.folder_path` (ver [modelo de datos](../01-arquitectura/modelo-datos-local.md)).

## Nombres de fichero

- Originales y singles: `AAAAMMDD_HHMMSS_mmm.jpg` (marca de tiempo, como el flujo actual).
- Layout: `AAAAMMDD_HHMMSS_layout.jpg`.
- GIF: `AAAAMMDD_HHMMSS.gif`.
- Confesión: `AAAAMMDD_HHMMSS_confesion.mp4`.
