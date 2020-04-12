const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname + "/..", "config", "config.js"))[
  env
];

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Gift = require("./gift")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);
db.UserThumb = require("./userThumb")(sequelize, Sequelize);

module.exports = db;
