const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const initModels = require('./models/init-models')

dotenv.config()

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USERNAME,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        dialect: 'mysql',
        define: {
            underscored: true,
            freezeTableName: true,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
)

module.exports = {
    ...initModels(sequelize),
    sequelize: sequelize,
    Sequelize: Sequelize
}