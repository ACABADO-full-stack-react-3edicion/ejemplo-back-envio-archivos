require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("imagenes:servidor:errores");

const errorServidor = (err, puerto) => {
  debug(chalk.red("Error al iniciar el servidor"));
  if (err.code === "EADDRINUSE") {
    debug(chalk.red(`El puerto ${puerto} está ocupado.`));
  }
};

const error404 = (req, res, next) => {
  res.status(404).json({ error: true, mensaje: "Recurso no encontrado" });
};

const errorGeneral = (err, req, res, next) => {
  const codigo = err.codigo || 500;
  const mensaje = err.codigo ? err.message : "Error general";
  console.log(err.message);
  res.status(codigo).json({ error: true, mensaje });
};

module.exports = {
  errorServidor,
  error404,
  errorGeneral,
};
