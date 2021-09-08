
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { dbConnection } = require("../src/configDB/config");

const app = express();

dbConnection();

const routes = require("../src/routes/index");

app.use(cors());

app.use(express.json());

app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log("Servidor corriento en el puerto 4000");
});