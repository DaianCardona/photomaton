# GIF y vídeo

Cubre RF-050/051 (GIF automático) y se relaciona con [vídeo-confesiones](video-confesiones.md).

## GIF automático

Cuando la plantilla tiene **2 o más fotos**, la app genera automáticamente un GIF con el conjunto de
las fotos de la sesión y lo guarda en la subcarpeta `gifs/` del evento.

### Comportamiento
- Se construye con los **singles** (fotos ya con filtro/fondo), en el orden de captura.
- Se genera tras el montaje del layout, en segundo plano (no bloquea impresión ni compartir).
- Se encola para subir a la web igual que las fotos (RF-060/061).

### Parámetros (configurables)
| Parámetro | Por defecto |
|-----------|-------------|
| Duración por frame | 600–800 ms |
| Bucle | infinito |
| Resolución | lado largo ~1080 px (web-friendly) |
| Efecto | secuencia simple; opción "boomerang" (ida y vuelta) |
| Formato adicional | MP4 corto opcional (mejor para móvil/redes) |

### Implementación
- **ffmpeg** (ffmpeg-static + fluent-ffmpeg) en el proceso main.
- Pipeline: lista de singles → escalado → ensamblado → paleta optimizada (`palettegen`/`paletteuse`) para GIF de calidad, o `libx264` para MP4.
- Nota: el flujo actual con dslrbooth ya genera MP4 cortos ("Animated"); aquí lo replicamos como GIF + MP4 opcional.

## Vídeo (general)

Además del GIF de sesión, la app graba **clips de vídeo** en el módulo de confesiones (ver doc dedicado).
ffmpeg es el motor común para todo el procesado de vídeo:

- GIF/MP4 de la secuencia de fotos.
- Codificación de las confesiones (vídeo + audio del micrófono).
- Posibles "boomerangs" o clips cortos de la sesión como mejora futura.

## Almacenamiento

| Medio | Carpeta |
|-------|---------|
| GIF de sesión | `gifs/` |
| MP4 corto de sesión (si activo) | `gifs/` o `videos/` |
| Confesiones | `confesiones/` |
| Vídeos varios | `videos/` |

Ver [estructura de carpetas](estructura-carpetas-evento.md).
