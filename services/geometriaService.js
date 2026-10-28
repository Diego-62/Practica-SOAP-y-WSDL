// Redondea para evitar errores de coma flotante (por ejemplo 0.1 + 0.2)
function redondear(valor, decimales = 5) {
  const factor = 10 ** decimales;
  return Math.round(valor * factor) / factor;
}

// Convierte el dato recibido a número positivo o responde con un SOAP Fault
function leerMedida(valor, nombreCampo) {
  const numero = Number(valor);
  if (valor === undefined || valor === null || valor === '' || !Number.isFinite(numero) || numero <= 0) {
    throw {
      Fault: {
        Code: { Value: 'soap:Sender' },
        Reason: { Text: `El campo '${nombreCampo}' debe ser un número mayor que cero` },
        statusCode: 400,
      },
    };
  }
  return numero;
}

const geometriaService = {
  GeometriaService: {
    GeometriaPort: {
      AreaRectangulo(args) {
        const base = leerMedida(args.base, 'base');
        const altura = leerMedida(args.altura, 'altura');
        return { area: redondear(base * altura) };
      },

      PerimetroRectangulo(args) {
        const base = leerMedida(args.base, 'base');
        const altura = leerMedida(args.altura, 'altura');
        return { perimetro: redondear(2 * (base + altura)) };
      },
    },
  },
};

module.exports = geometriaService;