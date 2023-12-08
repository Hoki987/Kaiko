const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Utility/database.js')

const embedsModel = sequelize.define(
    'embedsModel',
    {
        executor: {
            type: DataTypes.STRING, // кто сменил эмбед
            allowNull: false
        },
        embed: {
            type: DataTypes.STRING, // сам эмбед
            allowNull: true
        },
        type: {
            type: DataTypes.STRING, // откуда этот эмбед
            allowNull: false
        }
    },
    {
        tableName: 'embedsModel',
        // freezeTableName: true, выключает автоматическую плюрализацию
        updatedAt: true,

    }
)

module.exports = embedsModel;