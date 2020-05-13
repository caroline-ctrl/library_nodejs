const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'gestion_library', 
    'root',
    '',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
);

module.exports = sequelize;