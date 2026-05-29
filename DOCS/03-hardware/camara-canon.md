# Integración de cámara Canon

La app controla una **réflex/mirrorless Canon EOS** por USB (tethering): live view, disparo y descarga.
Las fotos actuales del usuario son `IMG_*.JPG` (Canon), por lo que esta es la vía principal.

> **Nota de hardware (importante).** El usuario dispone de un **Canon Speedlite 270EX II**, que es un
> **flash** (se monta sobre la cámara), **NO una cámara**. El control por USB / EDSDK requiere el
> **cuerpo de cámara Canon EOS**. **Pendiente:** confirmar el modelo del cuerpo EOS (p. ej. EOS 250D,
> 2000D, 1300D, 90D, R10…) para validar live view, disparo y, si aplica, vídeo. El Speedlite se usa
> como iluminación montado en la cámara; no interviene en la conexión con el PC.

## Vía principal: Canon EDSDK

- **EDSDK** (*EOS Digital SDK*) es el kit oficial de Canon para controlar cámaras EOS desde el PC.
- Se obtiene registrándose en el programa de desarrolladores de Canon (licencia/descarga oficial).
- En Electron se integra mediante un **addon nativo** (N-API/node-gyp) que envuelve las DLL del EDSDK, ejecutado en el proceso **main**.

### Capacidades necesarias
| Función | EDSDK |
|---------|-------|
| Detectar/abrir sesión con la cámara | `EdsGetCameraList`, `EdsOpenSession` |
| **Live view** (stream para la UI) | activar EVF, leer frames JPEG periódicos |
| **Disparo** | `EdsSendCommand(TakePicture)` o presionar shutter |
| **Descarga** de la foto al PC | manejar evento de objeto y transferir a `originales/` |
| Ajustes (ISO, apertura, etc.) | propiedades EDSDK (opcional para auto-config) |
| Modo vídeo (confesiones) | según modelo; iniciar/parar grabación o stream |

### Notas de integración
- El EDSDK tiene un **modelo de hilos** estricto: las llamadas suelen ir en un hilo dedicado; el addon debe serializarlas y emitir eventos al bucle de Node.
- Los frames de live view se envían al renderer por IPC (como JPEG/base64 o buffer compartido) a ~24–30 fps.
- Compatibilidad por modelo: confirmar el modelo concreto de cámara del usuario para validar live view y vídeo.

## Fallback: gphoto2 / libgphoto2

- Librería libre multi-fabricante. Útil si el EDSDK da problemas con un modelo o como alternativa.
- En Windows su soporte es más limitado que en Linux; se valora como **plan B** o para modelos no-Canon.
- Integración vía binario `gphoto2` (CLI) o binding nativo.

## Capa de abstracción en la app

Para no acoplar la app a un SDK concreto, `main/camera/` expone una **interfaz** común:

```ts
interface CameraDriver {
  list(): Promise<CameraInfo[]>;
  open(id: string): Promise<void>;
  startLiveView(onFrame: (jpeg: Buffer) => void): Promise<void>;
  stopLiveView(): Promise<void>;
  capture(): Promise<{ path: string }>;     // guarda en originales/
  startVideo?(): Promise<void>;
  stopVideo?(): Promise<{ path: string }>;
  close(): Promise<void>;
}
```

Implementaciones: `EdsdkDriver` (principal), `Gphoto2Driver` (fallback), `WebcamDriver` (pruebas/contingencia).

## Contingencia: webcam

- Driver de webcam (`getUserMedia`) como respaldo si falla la réflex en pleno evento (menor calidad, pero el servicio no se cae). Configurable en [ajustes](../02-app-escritorio/pantalla-ajustes.md).

## Pruebas recomendadas

- Disparo de test desde ajustes.
- Medir latencia de live view (objetivo RNF-002) y tiempo disparo→archivo.
- Probar reconexión USB (desenchufar/enchufar) sin reiniciar la app.

> Pendiente de confirmar: **modelo del cuerpo Canon EOS** (el Speedlite 270EX II es solo el flash) para
> fijar capacidades de live view/vídeo y compatibilidad con el EDSDK.
