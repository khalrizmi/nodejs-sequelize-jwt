const Sequelize = require('sequelize')
const db = require('./../config/database')

module.exports = db.sequelize.define(
    'users',
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        created_at: {
            defaultValue: Sequelize.NOW,
            type: Sequelize.DATE
        }
    },
    {
        timestamps: false
    }
)