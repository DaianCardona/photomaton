# Integración de impresora DNP

Impresora de sublimación térmica **DNP DS-RX1** (modelo CONFIRMADO por el usuario). Se imprime el
layout 10x15 (4x6) con número de copias configurable y **corte** opcional en 2 tiras 5x15 (2x6).

## Modelo y papel

| Modelo | Papel | Corte de tiras |
|--------|-------|----------------|
| **DS-RX1** (confirmado) | 10x15 (4x6) y, con el consumible adecuado, 5x15 (2x6) | Sí (2-inch cut) |

- La DS-RX1 es una impresora de 6 pulgadas orientada a fotomatón/retail; trabaja principalmente con consumible 4x6 (10x15) y soporta el corte a 2x6 (5x15).
- El **corte 10x15 → 2×(5x15)** es una función del **driver/firmware DNP**, no algo que se "recorte" en software: se activa una opción de impresión que indica a la impresora que parta la hoja.

## Vía de impresión

DNP se integra de dos formas (se elige según disponibilidad):

1. **Driver de Windows + opciones de impresión** (vía principal en Electron):
   - Se imprime con la API de impresión del sistema (Electron `webContents.print` / `printToPDF` + spooler, o un módulo nativo de impresión).
   - El **corte**, el **acabado** (mate/brillo) y el **multicopia** se controlan vía los *DEVMODE*/preferencias del driver DNP (preset de impresora) o ajustes específicos del driver.
   - Práctica habitual: crear **presets** en el driver DNP (uno "10x15 entero", otro "5x15 corte") y seleccionar el preset adecuado al imprimir.

2. **SDK/Hot Folder de DNP** (si está disponible para el modelo):
   - DNP ofrece *SDK* y soluciones tipo *hot folder*/print system para fotomatón; permiten controlar copias, corte y acabado programáticamente.
   - Se evaluará para tener control fino sin depender de cuadros de diálogo del driver.

## Requisitos funcionales cubiertos

| RF | Cómo |
|----|------|
| RF-030 Imprimir layout automáticamente | Enviar el JPG de `layout/` a la impresora tras la sesión |
| RF-031 Copias por defecto | Parámetro de copias del trabajo de impresión |
| RF-032 Reimprimir bajo demanda | Nuevo `print_job` desde la galería |
| RF-033 Corte 5x15/10x15 | Preset/opción de corte del driver DNP |
| RF-035 Estado de impresora | Leer estado del spooler/driver (papel, error) |

## Consideraciones

- **Tamaño y DPI del layout** deben casar con el papel (300 DPI; 10x15 ≈ 1181×1772 px). El corte 5x15 implica diseñar/duplicar contenido por tira si se quieren dos tiras idénticas (típico en fotomatón).
- **Acabado** (matte/glossy) y **sobrecapa** según consumible.
- **Colas**: gestionar varias impresiones seguidas sin saturar; estado y reintentos.
- **Calibración de color** (perfil ICC de DNP) para fidelidad.

## Abstracción en la app

`main/printer/` expone una interfaz:

```ts
interface PrinterDriver {
  list(): Promise<PrinterInfo[]>;
  getStatus(id: string): Promise<PrinterStatus>;  // papel restante, error
  print(opts: {
    file: string;            // ruta del layout
    copies: number;
    cut: '10x15' | '5x15';
    finish?: 'glossy' | 'matte';
  }): Promise<PrintResult>;
}
```

## Pruebas recomendadas

- Impresión de test (10x15 entero y 5x15 con corte).
- Verificar contador de papel restante.
- Comportamiento al quedarse sin papel a mitad de cola.

> Modelo confirmado: **DNP DS-RX1**. Crear en su driver los presets "10x15 entero" y "5x15 con corte".
> Evaluar el SDK / hot-folder de DNP para control programático del corte y las copias.
