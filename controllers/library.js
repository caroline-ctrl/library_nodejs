// on recupère le modele donc la classe Book c'est pour va que la variable a une majuscule
const Book = require('../models/book');
const Cart = require('../models/cart');




// affiche tous les livres en appelant la vue "library/book-list"
exports.getAllBooks = (req, res, next) => {
    Book.fetchAll()
        .then(([books]) => {
            res.render('library/book-list', {
                pageTitle: 'Tous les livres',
                path: '/',
                books: books
            });
        })
        .catch(err => console.log(err))
};


exports.getBookById = (req, res, next) => {
    const bookId = req.params.bookId;
    Book.getBooksById(bookId)
        .then(([book]) => {
            res.render('library/book-detail', {
                book: book[0],
                pageTitle: book.title,
                path: '/books'
            })    
        })
        .catch(err => console.log(err))
}


// affiche tous les livres en appelant la vue "library/index"
// utilise la bdd
exports.getIndex = (req, res) => {
    Book.fetchAll()
        .then(([books]) => {
            res.render('library/index', {
                pageTitle: 'Librarie',
                path: '/',
                books: books
            });
        })
        .catch(err => console.log(err));
};

// 
exports.getCart = (req, res) => {
    Cart.getCart(cart => {
        Book.fetchAll(books => {
            const cartBooks = [];
            for(book of books) {
                const cartBookData = cart.books.find(bk => bk.id === book.id);
                if (cartBookData){
                    cartBooks.push({bookData: book, qty: cartBookData.qty});
                }
            }
            res.render('library/cart', {
                path: '/cart',
                pageTitle: 'Votre panier',
                books: cartBooks,
                cart: cart
            })
        })
    })
};


exports.postCart = (req, res, next) => {
    const bookId = req.body.bookId;
    Book.getBooksById(bookId, book => {
        Cart.addBook(bookId, book.price);
    })
    res.redirect('/cart');
}


exports.postCartDeleteBook = (req, res, next) => {
    const bookId = req.body.bookId;
    Book.getBooksById(bookId, book => {
        Cart.deleteBook(bookId, book.price);
        res.redirect('/cart');
    })
}


exports.getCheckout = (req, res) => {
    res.render('library/checkout', {
        path: '/checkout',
        pageTitle: 'Paiement'
    });
};


exports.getOrders = (req, res) => {
    res.render('library/orders', {
        path: '/orders',
        pageTitle: 'Paiement'
    });
};

