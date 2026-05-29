# F0-07 · Detección de cámara e impresora (listado/estado)

**Fase:** 0 · Cimientos
**Depende de:** F0-03
**Estimación:** M (1 día)
**Cubre:** RF-071 (base), RF-035 (estado básico)

## Objetivo
Detectar y **listar** las cámaras e impresoras disponibles en el sistema, y mostrar su estado básico en
ajustes, **sin** implementar todavía captura ni impresión reales (eso es Fase 1). Sienta la base de las
interfaces `CameraDriver` y `PrinterDriver`.

> No depende del modelo concreto de cámara (pendiente): aquí solo se enumeran dispositivos.

## Subtareas
- [ ] Definir interfaces `CameraDriver` y `PrinterDriver` en `src/main/camera/` y `src/main/printer/` (según docs de hardware).
- [ ] **Impresoras:** enumerar las del sistema (API de impresión de Windows / Electron `getPrintersAsync`) y detectar si está la **DNP DS-RX1**; mostrar nombre y estado (lista/no disponible).
- [ ] **Cámaras:** enumerar dispositivos. Implementar primero el **WebcamDriver** (`enumerateDevices`) como contingencia/listado; dejar el hueco para `EdsdkDriver` (Canon) a implementar en Fase 1 cuando se confirme el cuerpo EOS.
- [ ] Exponer por IPC (F0-03): `hardware.listCameras()`, `hardware.listPrinters()`, `hardware.getPrinterStatus(id)`.
- [ ] UI en ajustes → Hardware: listas con dispositivo seleccionado y estado; botón "refrescar".
- [ ] Persistir la selección de cámara/impresora preferida en ajustes (F0-06).
- [ ] Manejo de "sin dispositivos" y de reconexión (refrescar lista).

## Criterios de aceptación
- La pantalla de ajustes muestra la(s) impresora(s) del sistema e identifica la **DS-RX1** si está conectada, con su estado.
- Se listan las cámaras/webcams disponibles y se puede seleccionar una preferida (persistida).
- Las interfaces `CameraDriver`/`PrinterDriver` están definidas y el listado pasa por ellas.
- Refrescar tras conectar/desconectar un dispositivo actualiza la lista.

## Referencias
- [camara-canon](../03-hardware/camara-canon.md) (interfaz `CameraDriver`, EDSDK/fallback)
- [impresora-dnp](../03-hardware/impresora-dnp.md) (interfaz `PrinterDriver`, DS-RX1)
- [pantalla-ajustes](../02-app-escritorio/pantalla-ajustes.md) (sección Hardware)

## Notas
- El control real (live view, disparo, impresión con corte) es **Fase 1**; aquí solo detección/estado.
- La integración Canon EDSDK se aborda cuando el usuario confirme el **cuerpo de cámara EOS** (pendiente).
