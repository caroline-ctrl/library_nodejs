const express = require('express');
// const path = require('path');
// const rootDir = require ('../helper/path-helper');

const adminController = require('../controllers/admin');

const router = express.Router();

// tableau vide pour récuperer le contenu de l'input
const books = [];

// /admin/add-book
router.get('/add-book', adminController.getAddBook);
router.get('/books', adminController.getBooks);


// /admin/book
router.post('/books', adminController.postBook);

router.get('/edit-book/:bookId', adminController.getEditBook);
router.post('/edit-book', adminController.postEditBook);
router.post('/delete-book', adminController.deletBook);

exports.routes = router;
exports.books = books;