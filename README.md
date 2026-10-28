# Práctica: Servicios web SOAP con Express y WSDL

Aplicación en Node.js y Express que expone **dos servicios web SOAP**, cada uno con su propio contrato WSDL y dos operaciones. Las peticiones y respuestas son sobres SOAP en XML. Un middleware registra cada petición recibida.

## Requisitos

- Node.js 18 o superior (incluye npm)
- Git
- Para probar: curl, o bien Postman / SoapUI

## Instalación

```bash
git clone https://github.com/Diego-62/Practica-SOAP-y-WSDL.git
cd Practica-SOAP-y-WSDL
npm install
```

## Ejecución

```bash
npm start
```

El servidor escucha en el puerto **3000**. Al arrancar debe mostrar:

```
Servicio ConversionesService listo en /soap/conversiones
Servicio GeometriaService listo en /soap/geometria
Servidor SOAP escuchando en http://localhost:3000
```

Para detenerlo, presiona `Ctrl + C`.

## Servicios, endpoints y contratos WSDL

| Servicio | Endpoint | Contrato WSDL | Operaciones |
|---|---|---|---|
| ConversionesService | `http://localhost:3000/soap/conversiones` | `http://localhost:3000/soap/conversiones?wsdl` | `CelsiusAFahrenheit`, `KilometrosAMillas` |
| GeometriaService | `http://localhost:3000/soap/geometria` | `http://localhost:3000/soap/geometria?wsdl` | `AreaRectangulo`, `PerimetroRectangulo` |

Los contratos también están como archivos en la carpeta `wsdl/`.

## Estructura del proyecto

```
├── server.js                      Arranque del servidor
├── app.js                         Configuración de Express (middleware y Router)
├── routes/soapRoutes.js           Router que registra los servicios SOAP
├── middlewares/logger.js          Middleware de registro de peticiones
├── services/
│   ├── conversionesService.js     Lógica de ConversionesService
│   └── geometriaService.js        Lógica de GeometriaService
├── wsdl/
│   ├── conversiones.wsdl          Contrato de ConversionesService
│   └── geometria.wsdl             Contrato de GeometriaService
├── pruebas/                       Peticiones SOAP (XML) de prueba
└── evidencias/                    Capturas de las pruebas
```

## Middleware de registro

`middlewares/logger.js` se ejecuta antes de las rutas SOAP y registra, por cada petición, el método HTTP, la URL, el código de estado y el tiempo de procesamiento. No modifica el contenido XML. Ejemplo de salida:

```
[2026-10-28T18:30:12.123Z] GET /soap/conversiones?wsdl -> 200 (4.12 ms)
[2026-10-28T18:30:20.456Z] POST /soap/conversiones -> 200 (3.41 ms)
```

## Pruebas

Con el servidor en ejecución, abre una segunda terminal en la carpeta del proyecto.

### 1. Consultar los contratos WSDL

Abre en el navegador:

- http://localhost:3000/soap/conversiones?wsdl
- http://localhost:3000/soap/geometria?wsdl

Cada contrato debe mostrar sus dos operaciones y, en `<service>`, la dirección de su propio endpoint.

### 2. Invocar las operaciones

Las cuatro peticiones están en la carpeta `pruebas/`. Cada una se envía por POST con el encabezado `Content-Type: text/xml; charset=utf-8` y el encabezado `SOAPAction` de su operación.

| # | Operación | Petición | Endpoint | SOAPAction | Caso | Resultado esperado |
|---|---|---|---|---|---|---|
| 1 | CelsiusAFahrenheit | `pruebas/01-celsius-a-fahrenheit.xml` | `/soap/conversiones` | `http://practica.soap/conversiones/CelsiusAFahrenheit` | 25 °C | `<fahrenheit>77</fahrenheit>` |
| 2 | KilometrosAMillas | `pruebas/02-kilometros-a-millas.xml` | `/soap/conversiones` | `http://practica.soap/conversiones/KilometrosAMillas` | 10 km | `<millas>6.21371</millas>` |
| 3 | AreaRectangulo | `pruebas/03-area-rectangulo.xml` | `/soap/geometria` | `http://practica.soap/geometria/AreaRectangulo` | base 8, altura 5 | `<area>40</area>` |
| 4 | PerimetroRectangulo | `pruebas/04-perimetro-rectangulo.xml` | `/soap/geometria` | `http://practica.soap/geometria/PerimetroRectangulo` | base 8, altura 5 | `<perimetro>26</perimetro>` |

#### Con curl

En Linux y macOS usa `curl`. En Windows PowerShell escribe `curl.exe` (sin `.exe`, PowerShell usa otro comando).

```bash
curl -X POST -H "Content-Type: text/xml; charset=utf-8" -H "SOAPAction: http://practica.soap/conversiones/CelsiusAFahrenheit" --data-binary "@pruebas/01-celsius-a-fahrenheit.xml" http://localhost:3000/soap/conversiones

curl -X POST -H "Content-Type: text/xml; charset=utf-8" -H "SOAPAction: http://practica.soap/conversiones/KilometrosAMillas" --data-binary "@pruebas/02-kilometros-a-millas.xml" http://localhost:3000/soap/conversiones

curl -X POST -H "Content-Type: text/xml; charset=utf-8" -H "SOAPAction: http://practica.soap/geometria/AreaRectangulo" --data-binary "@pruebas/03-area-rectangulo.xml" http://localhost:3000/soap/geometria

curl -X POST -H "Content-Type: text/xml; charset=utf-8" -H "SOAPAction: http://practica.soap/geometria/PerimetroRectangulo" --data-binary "@pruebas/04-perimetro-rectangulo.xml" http://localhost:3000/soap/geometria
```

La respuesta es un sobre SOAP en XML que contiene el valor de la última columna de la tabla.

#### Con Postman

1. Crea una petición **POST** con la URL del endpoint.
2. En **Headers** agrega `Content-Type: text/xml; charset=utf-8` y `SOAPAction` con el valor de la tabla.
3. En **Body** elige **raw**, formato **XML**, y pega el contenido del archivo de `pruebas/`.
4. Pulsa **Send**. El estado debe ser `200 OK`.

## Evidencias

Las capturas están en la carpeta `evidencias/`.

| Evidencia | Archivo |
|---|---|
| Contrato WSDL de conversiones | `evidencias/wsdl-conversiones.png` |
| Contrato WSDL de geometría | `evidencias/wsdl-geometria.png` |
| Respuesta de CelsiusAFahrenheit | `evidencias/postman-01-celsius-a-fahrenheit.png` |
| Respuesta de KilometrosAMillas | `evidencias/postman-02-kilometros-a-millas.png` |
| Respuesta de AreaRectangulo | `evidencias/postman-03-area-rectangulo.png` |
| Respuesta de PerimetroRectangulo | `evidencias/postman-04-perimetro-rectangulo.png` |
| Registro del middleware | `evidencias/log-middleware.png` |

## Conclusiones

Ver [CONCLUSIONES.md](CONCLUSIONES.md).