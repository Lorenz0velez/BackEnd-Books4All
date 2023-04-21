const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('Sales',
    {
      id: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true,
      },
      id_book: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      id_event: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { timestamps: false }
  );
};
