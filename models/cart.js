// c'est une table qui defini le panier général
const Sequelize = require('sequelize');
const sequelize = require('../helper/database');

const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull : false,
        primaryKey: true
    }
})

module.exports = Cart;