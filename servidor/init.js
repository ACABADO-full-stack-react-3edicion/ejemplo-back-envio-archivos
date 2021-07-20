require("dotenv").config();
const debug = require("debug")("imagenes:servidor:inicio");
const express = require("express");
const chalk = require("chalk");
const { errorServidor } = require("./errores");

const app = express();

const puerto = process.env.PUERTO_SERVIDOR || 4000;

const server = app.listen(puerto, () => {
  debug(
    chalk.yellow(
      `Servidor escuchando en http://localhost:${chalk.green(puerto)}`
    )
  );
});

server.on("error", (err) => errorServidor(err, puerto));

module.exports = app;
