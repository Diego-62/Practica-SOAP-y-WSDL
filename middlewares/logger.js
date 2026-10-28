function logger(req, res, next) {
  const inicio = process.hrtime.bigint();

  // El código de estado solo se conoce cuando la respuesta termina.
  res.on('finish', () => {
    const duracionMs = Number(process.hrtime.bigint() - inicio) / 1e6;
    const fecha = new Date().toISOString();
    console.log(
      `[${fecha}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duracionMs.toFixed(2)} ms)`
    );
  });

  next();
}

module.exports = logger;