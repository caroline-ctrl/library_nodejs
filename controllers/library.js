// on recupère le modele donc la classe Book c'est pour va que la variable a une majuscule
const Book = require('../models/book');




// affiche tous les livres en appelant la vue "library/book-list"
exports.getAllBooks = (req, res, next) => {
    Book.findAll()
        .then(books => {
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
    Book.findByPk(bookId).then(book => {
        res.render('library/book-detail', {
            book: book,
            pageTitle: book.title,
            path: '/books'
        })      
    }).catch(err => console.log(err))
}


// affiche tous les livres en appelant la vue "library/index"
// utilise la bdd
exports.getIndex = (req, res) => {
    Book.findAll()
        .then(books => {
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
    req.user.getCart().then(cart => {
        return cart.getBooks().then(books => {
            res.render('library/cart', {
                path: '/cart',
                pageTitle: 'Votre panier',
                books: books
            })
        })
    }).catch(err => console.log(err))
};


exports.postCart = (req, res, next) => {
    const bookId = req.body.bookId;
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart().then(cart => {
        fetchedCart = cart;
        return cart.getBooks({where: {id: bookId}})
    }).then(books => {
        let book;
        if(books.length > 0){
            book = books[0]
        }
        if (book){
            const oldQuantity = book.cartItem.quantity
            newQuantity = oldQuantity + 1
            return book
        }
        return Book.findByPk(bookId)
    }).then(book => {
        return fetchedCart.addBook(book, {
            through: {quantity: newQuantity}
        })
    }).then(() => {
        res.redirect('/cart');
    }).catch(err => console.log(err))
}


exports.postCartDeleteBook = (req, res, next) => {
    const bookId = req.body.bookId;
    req.user.getCart().then(cart => {
        return cart.getBooks({where: {id: bookId}})
    }).then(books => {
        const book = books[0]
        return book.cartItem.destroy()
    }).then(result => {
        res.redirect('/cart');
    }).catch(err => console.log(err))
}


exports.getCheckout = (req, res) => {
    res.render('library/checkout', {
        path: '/checkout',
        pageTitle: 'Paiement'
    });
};


exports.postOrders = (req, res, next) => {
    let fetchedCart;
    req.user.getCart().then(cart => {
        fetchedCart = cart;
        return cart.getBooks()
    }).then(books => {
        return req.user.createOrder().then(order => {
            return order.addBook(books.map(book => {
                book.orderItem = {quantity: book.cartItem.quantity}
                return book
            }))
        }).then(result => {
            return fetchedCart.setBooks(null)
        }).then(result => {
            res.redirect('/orders')
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}


exports.getOrders = (req, res) => {
    req.user.getOrders({include: ['books']}).then(orders => {
        res.render('library/orders', {
            path: '/orders',
            pageTitle: 'Paiement',
            orders: orders
        });
    })
};

