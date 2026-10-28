const express = require('express');
const logger = require('./middlewares/logger');
const soapRoutes = require('./routes/soapRoutes');

const app = express();

// 1) El middleware de registro va ANTES de las rutas SOAP.
app.use(logger);

// 2) Los servicios SOAP se registran desde el Router.
//    No se usa express.json(): el cuerpo de las peticiones es XML.
app.use('/soap', soapRoutes);

// 3) Cualquier otra ruta responde 404.
app.use((req, res) => {
  res.status(404).type('text/plain').send('Ruta no encontrada');
});

module.exports = app;