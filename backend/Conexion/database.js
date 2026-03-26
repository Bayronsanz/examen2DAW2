const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'DAWII',
    'root',
    '',
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql'
    }
)

sequelize.authenticate()
    .then(() => console.log('Conexion exitosa'))
    .catch((error) => console.log('error en la conexion' + error))

module.exports = sequelize