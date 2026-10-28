const FACTOR_KM_A_MILLAS = 0.621371;

// Redondea para evitar resultados como 6.213710000000001
function redondear(valor, decimales = 5) {
  const factor = 10 ** decimales;
  return Math.round(valor * factor) / factor;
}

// Convierte el dato recibido a número o responde con un SOAP Fault
function leerNumero(valor, nombreCampo) {
  const numero = Number(valor);
  if (valor === undefined || valor === null || valor === '' || !Number.isFinite(numero)) {
    throw {
      Fault: {
        Code: { Value: 'soap:Sender' },
        Reason: { Text: `El campo '${nombreCampo}' debe ser un número válido` },
        statusCode: 400,
      },
    };
  }
  return numero;
}

const conversionesService = {
  ConversionesService: {
    ConversionesPort: {
      CelsiusAFahrenheit(args) {
        const celsius = leerNumero(args.celsius, 'celsius');
        return { fahrenheit: redondear((celsius * 9) / 5 + 32) };
      },

      KilometrosAMillas(args) {
        const kilometros = leerNumero(args.kilometros, 'kilometros');
        return { millas: redondear(kilometros * FACTOR_KM_A_MILLAS) };
      },
    },
  },
};

module.exports = conversionesService;