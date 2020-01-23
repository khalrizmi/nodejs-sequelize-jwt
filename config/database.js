const Sequelize = require('sequelize')

const db = {}

const sequelize = new Sequelize("nodejs_jwt", "root", "root", {
    host: "localhost",
    port: "8889",
    dialect: "mysql",
    operatorAliases: false
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db