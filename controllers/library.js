// on recupère le modele donc la classe Book c'est pour va que la variable a une majuscule
const Book = require('../models/book');
const Cart = require('../models/cart');

// affiche tous les livres en appelant la vue "library/book-list"
exports.getAllBooks = (req, res, next) => {
    // on tape sur la classe Book, puis fait appel a la fonction fetchAll du controller
    Book.fetchAll(books => { // "books" est le callback (parametre de la fonction getBookFromJson du model)
        res.render('library/book-list', {
            pageTitle: 'Tous les livres',
            path: '/',
            books: books
        });
    });
};


exports.getBookById = (req, res, next) => {
    const bookId = req.params.bookId;
    Book.getBooksById(bookId, book => {
        res.render('library/book-detail', {
            book: book,
            pageTitle: book.title,
            path: '/books'
        })
    });
}


// affiche tous les livres en appelant la vue "library/index"
exports.getIndex = (req, res) => {
    Book.fetchAll(books => { // "books" est le callback (parametre de la fonction getBookFromJson du model)
        res.render('library/index', {
            pageTitle: 'Librarie',
            path: '',
            books: books
        });
    });
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

