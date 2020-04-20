const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./database/entity/index").sequelize;
const apiRouter = require("./routes");
const morgan = require("morgan");

const app = express();
sequelize.sync();
const PORT = 3002;
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`app is listening in port ${PORT}`);
});
