require("dotenv").config();
const debug = require("debug")("imagenes:servidor");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "imagenes",
  filename: (req, file, cb) => {
    const nombreArchivo = `${path.basename(
      file.originalname,
      path.extname(file.originalname)
    )}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, `${nombreArchivo}`);
  },
});
const upload = multer({ storage });
const { error404, errorGeneral } = require("./errores");
const app = require("./init");

app.use(morgan("dev"));

app.post("/usuarios/registro", upload.single("imagen"), (req, res, next) => {
  console.log(req.file);
  res.send("Usuario registrado");
});

app.use(error404);
app.use(errorGeneral);
