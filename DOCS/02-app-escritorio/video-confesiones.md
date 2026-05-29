# Vídeo-confesiones

Cubre RF-052/053 y CU-04. Módulo donde un invitado graba un **mensaje en vídeo** (con audio) para los
anfitriones. Requiere cámara + **micrófono** conectado.

## Flujo

```
[Menú] invitado entra en "Confesiones"
   ▼
[Comprobación] cámara + micrófono OK; muestra medidor de nivel de audio
   ▼
[Instrucciones breves] + cuenta atrás
   ▼
[Grabación] vídeo + audio; indicador de tiempo (límite configurable)
   ▼
[Revisión] reproducir → [Repetir] o [Guardar]
   ▼
[Guardado] en confesiones/  +  encolar para sync si procede
```

## Fuentes de audio y vídeo

- **Vídeo:** preferentemente la misma réflex Canon en modo vídeo (si el EDSDK/modelo lo permite) o una webcam dedicada. Ver [cámara](../03-hardware/camara-canon.md).
- **Audio:** micrófono USB/externo. Captura y medición de nivel; ver [micrófono y audio](../03-hardware/microfono-audio.md).
- En el renderer se puede usar `getUserMedia` + `MediaRecorder` para webcam+mic; para réflex en vídeo, el main gestiona el stream y ffmpeg multiplexa con el audio del micrófono.

## Parámetros (configurables)

| Parámetro | Por defecto |
|-----------|-------------|
| Duración máxima | 30–60 s |
| Resolución | 1080p si el hardware lo permite |
| Cuenta atrás antes de grabar | 3 s |
| Permitir repetir | sí |
| Recordatorio en pantalla | "Deja tu mensaje a los novios" |

## Almacenamiento

- Clip final (vídeo+audio) en `confesiones/` con nombre por marca de tiempo.
- Metadatos en tabla `confessions` (ver [modelo de datos](../01-arquitectura/modelo-datos-local.md)).
- Encolado para subida (RF-061) como `kind=video`.

## Consideraciones

- **Sincronización A/V:** asegurar *sync* labial; ffmpeg con timestamps coherentes entre pista de vídeo y de audio.
- **Privacidad:** consentimiento explícito (es un mensaje personal); ver [seguridad y privacidad](../01-arquitectura/seguridad-y-privacidad.md).
- **Espacio:** los vídeos pesan; vigilar disco (RNF-018) y subir/archivar tras el evento.

## Alcance

El módulo de confesiones está en el alcance del MVP según la decisión del usuario, pero por su
complejidad técnica (sync A/V, vídeo en réflex) puede entregarse en una **subfase** posterior a la del
flujo de fotos. Ver [fases y MVP](../07-roadmap/fases-y-mvp.md).
