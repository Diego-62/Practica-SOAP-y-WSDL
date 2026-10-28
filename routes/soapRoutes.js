const fs = require('fs');
const path = require('path');
const express = require('express');
const soap = require('soap');

const conversionesService = require('../services/conversionesService');
const geometriaService = require('../services/geometriaService');

const router = express.Router();

// Lee el contrato WSDL como texto (node-soap lo recibe como cadena XML)
function leerWsdl(nombreArchivo) {
  return fs.readFileSync(path.join(__dirname, '..', 'wsdl', nombreArchivo), 'utf8');
}

// Registra un servicio SOAP en el Router y avisa cuando queda listo
function registrarServicio(rutaRelativa, servicio, wsdl, etiqueta) {
  soap.listen(router, rutaRelativa, servicio, wsdl, (err) => {
    if (err) {
      console.error(`Error al registrar ${etiqueta}:`, err);
    } else {
      console.log(`Servicio ${etiqueta} listo en /soap${rutaRelativa}`);
    }
  });
}

registrarServicio('/conversiones', conversionesService, leerWsdl('conversiones.wsdl'), 'ConversionesService');
registrarServicio('/geometria', geometriaService, leerWsdl('geometria.wsdl'), 'GeometriaService');

module.exports = router;