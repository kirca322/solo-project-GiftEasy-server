module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "userThumb",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      commentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
