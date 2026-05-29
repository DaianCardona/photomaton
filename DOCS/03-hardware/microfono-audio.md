# Micrófono y audio

Necesario para el módulo de [vídeo-confesiones](../02-app-escritorio/video-confesiones.md). Captura de
audio de un micrófono externo, con medición de nivel y mezcla con el vídeo.

## Dispositivos

- **Micrófono USB** (recomendado: simple, *plug & play* en Windows) o micrófono de solapa por interfaz USB.
- Selección del dispositivo de entrada en [ajustes → hardware](../02-app-escritorio/pantalla-ajustes.md).
- Enumeración de dispositivos vía `navigator.mediaDevices.enumerateDevices()` (renderer) o API de audio del SO (main).

## Captura

- En el renderer: `getUserMedia({ audio: { deviceId } })` + `MediaRecorder` para grabar webcam+mic juntos (caso webcam).
- Para réflex en vídeo: el vídeo viene del main (EDSDK) y el audio del micrófono se captura por separado; **ffmpeg** multiplexa ambas pistas cuidando el *sync* A/V.

## Funciones

| Función | Detalle |
|---------|---------|
| Medidor de nivel (VU) | Mostrar al invitado que se le oye antes de grabar |
| Selección de dispositivo | Elegir micrófono en ajustes |
| Test de audio | Grabar/reproducir 3 s de prueba |
| Reducción de ruido | Opcional (filtro ffmpeg `afftdn`) |
| Normalización | Nivelar volumen al guardar (`loudnorm`) |

## Sincronización A/V

- Punto crítico de las confesiones. Estrategias:
  - Grabar con marcas de tiempo coherentes y dejar que ffmpeg alinee por PTS.
  - Si hay *drift*, ajustar con `-itsoffset` o re-muxado.
- Validar *sync* labial en pruebas antes de producción.

## Consideraciones de evento

- Ambientes ruidosos (música, gente): conviene micrófono direccional/cercano y, si es posible, una zona algo apartada para confesiones.
- Niveles de entrada ajustables para evitar saturación.

Relacionado: [cámara Canon](camara-canon.md) (vídeo) · [requisitos de hardware](requisitos-hardware.md).
