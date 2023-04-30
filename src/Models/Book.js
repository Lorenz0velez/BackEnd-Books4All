const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Book",
    {
      id: {
        type: DataTypes.TEXT, // "id": "GLQvEAAAQBAJ",
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      authors: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      categories: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      price: {
        type: DataTypes.INTEGER,
      },
      stock: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.TEXT,
      },
      date: {
        type: DataTypes.DATE,
      },
      image: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
