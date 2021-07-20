require("dotenv").config();
const admin = require("firebase-admin");
const cors = require("cors");
const debug = require("debug")("imagenes:servidor");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const serviceAccount = require("../proyecto-final-imagenes-firebase-adminsdk-f93fm-e7dd565481.json");
// JSON descargado desde Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "proyecto-final-imagenes.appspot.com", // Nombre de vuestro bucket
});
const bucket = admin.storage().bucket();
const upload = multer();
const { error404, errorGeneral } = require("./errores");
const app = require("./init");

app.use(morgan("dev"));
app.use(cors());
app.post(
  "/usuarios/registro",
  upload.single("imagen"),
  async (req, res, next) => {
    const nombreArchivo = `${path.basename(
      req.file.originalname,
      path.extname(req.file.originalname)
    )}_${Date.now()}${path.extname(req.file.originalname)}`;
    const datos = bucket.file(nombreArchivo);
    const existe = await datos.exists();
    if (existe[0]) {
      // Capturamos y manejamos el error
      console.log("El archivo ya existe");
      return;
    }
    const ficheroFB = datos.createWriteStream({ resumable: false });
    ficheroFB.end(req.file.buffer);
    ficheroFB.on("error", (err) => {
      // Capturamos y manejamos el error
      console.log(err.message);
    });
    ficheroFB.on("finish", () => {
      // El archivo se ha subido correctamente
      // La url:      console.log(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${datos.name}?alt=media`);
      console.log("Archivo guardado en FireBase");
      console.log(
        `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${datos.name}?alt=media`
      );
    });
    res.send("Usuario registrado");
  }
);

app.use(error404);
app.use(errorGeneral);
