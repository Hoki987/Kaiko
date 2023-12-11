const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Utility/database.js');

const blackListNabor = sequelize.define(
    'blackListNabor',
    {
        executor: {
            type: DataTypes.STRING, // кто выдавал блокировку
            allowNull: false,
        },
        target: {
            type: DataTypes.STRING, // кому выдавали блокировку
            allowNull: false,
        },
        reason: {
            type: DataTypes.STRING, // причина блокирования
        },
        expiresAt: {
            type: DataTypes.DATE, // когда снимается блокировка
            allowNull: true
        },
    },
    {
        tableName: 'blackListNabor',
        // freezeTableName: true, выключает автоматическую плюрализацию
        updatedAt: false,
    }
)

module.exports = blackListNabor;