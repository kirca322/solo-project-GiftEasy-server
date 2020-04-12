const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./database/entity/index").sequelize;
const apiRouter = require("./routes/api");

const app = express();
sequelize.sync();
const PORT = 3000;
app.use(bodyParser.json());
app.use(cors());

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`app is listening in port ${PORT}`);
});
