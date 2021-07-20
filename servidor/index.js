require("dotenv").config();
const debug = require("debug")("imagenes:servidor");
const morgan = require("morgan");
const { error404, errorGeneral } = require("./errores");
const app = require("./init");

app.use(morgan("dev"));

app.use(error404);
app.use(errorGeneral);
