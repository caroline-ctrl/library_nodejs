const express = require('express');
const path = require('path');
const rootDir = require ('../helper/path-helper');
const adminData = require('./admin');

const libraryController = require('../controllers/library');


const router = express.Router();


router.get('/', libraryController.getIndex);
router.get('/books', libraryController.getAllBooks);
router.get('/books/:bookId', libraryController.getBookById); // permet de faire passer un paramettre variable (ex: id)
router.get('/cart', libraryController.getCart);
router.post('/cart', libraryController.postCart);
router.post('/cart-delete-item', libraryController.postCartDeleteBook);
router.get('/checkout', libraryController.getCheckout);
router.get('/orders', libraryController.getOrders);


module.exports = router;