const fs = require('fs');
const path = require('path'); // besoin du path pour utiliser les chemins
const rootPath = require('../helper/path-helper');

const pt = path.join(rootPath, 'data', 'cart.json');

module.exports = class Cart
{
    static getCart(callback)
    {
        fs.readFile(pt, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(err){
                callback(null);
            } else {
                callback(cart);
            }
        })
    }


    static addBook(id, bookPrice)
    {
        // recupèrer le précédent panier
        fs.readFile(pt, (err, fileContent) => {
            let cart = {books: [], totalPrice: 0};
            if(!err){
                cart = JSON.parse(fileContent);
            }
            // parcourir le panier pour trouver les livres existants
            const existingBookIndex = cart.books.findIndex(book => book.id === id);
            const existingBook = cart.books[existingBookIndex];
            let updateBook;
            // soit rajouter un nouveau livre soit mettre +1 a un livre existant
            if(existingBook){
                updateBook = {...existingBook};
                updateBook.qty = updateBook.qty +1;
                cart.books = [...cart.books];
                cart.books[existingBookIndex] = updateBook;
            } else {
                updateBook = {id: id, qty: 1};
                cart.books = [...cart.books, updateBook];
            }
            cart.totalPrice = cart.totalPrice + +bookPrice; // le 2eme + sert a mettre en int et non en string
            fs.writeFile(pt, JSON.stringify(cart), (err) => {
                console.log(err);
            })
        })
    }


    static deleteBook(id, bookPrice) 
    {
        fs.readFile(pt, (err, fileContent) => {
            if(err){
                return;
            }

            const updateCart = {...JSON.parse(fileContent)};
            const book = updateCart.books.find(book => book.id = id);
            if (!book){
                return;
            }
            const bookQty = book.qty;
            updateCart.books = updateCart.books.filter(book => book.id !== id);
            updateCart.totalPrice = updateCart.totalPrice - (bookPrice * bookQty);
            fs.writeFile(pt, JSON.stringify(updateCart), (err) => {
                console.log(err);
            })
        })
    }
}