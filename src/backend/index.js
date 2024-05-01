// init

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const fileUtils = require("./utils/files.js");
const cookieParser = require("cookie-parser");

// config

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const authMiddlewares = require("./middlewares/authMiddlewares.js");
const miscMiddlewares = require("./middlewares/miscMiddlewares.js");

const PORT = process.env.PORT ?? 5506;
const DB_URL = process.env.DB_URL;
const JWT_KEY = process.env.JWT_KEY;
if (!DB_URL) {
  throw "Error: no DB_URL parameter is configured for connection to the database.";
}
if (!JWT_KEY) {
  throw "Error: no JWT_KEY parameter is configured for authentication.";
}

const FRONTEND_URL = process.env.FRONTEND_URL;

app.all("*", function (req, res, next) {
  res.set("Access-Control-Allow-Origin", FRONTEND_URL ?? "*");
  res.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Origin"
  );
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

if (!FRONTEND_URL) {
  console.warn(
    "There is no frontend url configured, therefore '*' will be used as CORS origin, but this should not be the case in production. You must configure one as 'FRONTEND_URL' in the .env file."
  );
}

const UPLOADS_PATH = process.env.UPLOADS_PATH ?? "uploads";
fileUtils.generateUploadDirectory();

app.use("/files", authMiddlewares.checkToken, express.static(UPLOADS_PATH));
app.use(
  "/downloads",
  authMiddlewares.checkToken,
  miscMiddlewares.setDownloadHeaders,
  express.static(UPLOADS_PATH)
);

// routes

const userRoutes = require("./routes/userRoutes.js");
const taskRoutes = require("./routes/taskRoutes.js");

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

// launch

mongoose
  .connect(DB_URL)
  .then(function () {
    console.log("Connection to the database established successfully.");
    app.listen(PORT, function (err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Server online and listening at port ${PORT}.`);
    });
  })
  .catch(function (err) {
    console.error(err);
  });

//debug

/*const fs = require("fs");
const buffer = fs.readFileSync("./i.png");
console.log(
  fileUtils.getFileDisplayType({ arrayBuffer: buffer, name: "i.png" })
);
*/
