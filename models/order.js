// va contenir les produits reliés au panier
const Sequelize = require('sequelize');
const sequelize = require('../helper/database');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull : false,
        primaryKey: true
    }
})

module.exports = Order;