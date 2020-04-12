module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      googleId: {
        type: DataTypes.STRING(255),
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
