const { DataTypes } = require('sequelize');
const sequelize = require('../Utility/database.js')

const requestsStat = sequelize.define(
    'requestsStat',
    {
        executor: {
            type: DataTypes.STRING, // кто отправил
            allowNull: false
        },
        type: {
            type: DataTypes.STRING, // на какую ветку
            allowNull: false
        },
        status: {
            type: DataTypes.STRING, // В ожидании/Одобрено/Отклонено
            allowNull: false
        }
    },
    {
        tableName: 'requestsStat',
        // freezeTableName: true, выключает автоматическую плюрализацию
        updatedAt: false,

    }
)

module.exports = requestsStat;