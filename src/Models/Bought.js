const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Bought',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            books: {
                type: DataTypes.ARRAY(DataTypes.JSONB),
                allowNull: false
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            total: {
                type: DataTypes.FLOAT,
                allowNull: false
            }

        })
}