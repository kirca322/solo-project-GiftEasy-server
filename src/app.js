const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("../models/index").sequelize;

const app = express();
sequelize.sync();
const PORT = 3000;
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`app is listening in port ${PORT}`);
});
