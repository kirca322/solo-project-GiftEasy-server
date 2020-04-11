module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "gift",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    }
  );
};
