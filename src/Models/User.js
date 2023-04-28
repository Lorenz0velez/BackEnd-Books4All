const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        alterName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        picture: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        about: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
          }
    }, { timestamps: false,
        save: {
            fields: ['picture', 'about', 'alterName', 'email']
          } })
}