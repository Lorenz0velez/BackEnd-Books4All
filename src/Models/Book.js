const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Book",
    {
      id: {
        type: DataTypes.TEXT, // "id": "GLQvEAAAQBAJ",
        allowNull: false,
        primaryKey: true,
        defaultValue: Math.floor((Math.random() * 1000)) + Date.now().toString()
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
        allowNul: false,
        defaultValue: 30
      },
      description: {
        type: DataTypes.TEXT,
      },
      date: {
        type: DataTypes.TEXT,
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
