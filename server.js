const app = require('./app');

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor SOAP escuchando en http://localhost:${PORT}`);
  console.log(`WSDL conversiones: http://localhost:${PORT}/soap/conversiones?wsdl`);
  console.log(`WSDL geometria:    http://localhost:${PORT}/soap/geometria?wsdl`);
});