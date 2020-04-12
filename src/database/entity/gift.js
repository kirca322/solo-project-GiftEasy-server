module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "gift",
    {
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      isMan: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
};
