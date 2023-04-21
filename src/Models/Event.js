const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Event', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DECIMAL
        },
        stock: {
            type: DataTypes.INTEGER
        },
        date: {
            type: DataTypes.STRING
        }
    }, { timestamps: false })
}