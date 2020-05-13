// on recupère le modele donc la classe Book c'est pour va que la variable a une majuscule
const Book = require('../models/book');


// affiche le formulaire qui permet d'ajouter un livre
exports.getAddBook = (req, res, next) => {
    res.render('admin/edit-book', {
        pageTitle: 'Ajouter un livre',
        path: '/admin/add-book',
        editing: false
    });
};

// recupère le contenu des inputs et utilise la methode save puis redirection vers la page d'accueil
exports.postBook = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;

    req.user.createBook({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
    }).then(result => {
        console.log('Livre créer')
        res.redirect('admin/books')
    }).catch(err => console.log(err))
};


// affiche la liste de livres partie admin
exports.getBooks = (req, res) => {
    req.user.getBooks().then(books => {
        res.render('admin/books', {
            pageTitle: 'Admin liste des lives',
            path: '/',
            books: books
        })
    }).catch(err => console.log(err))
}


// mettre a jour un livre
exports.getEditBook = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const bookId = req.params.bookId;
    req.user.getBooks({where: {id:bookId}}).then(book => {
        if(!book) {
            console.log(book)
        }
        res.render('admin/edit-book', {
            pageTitle: 'Mettre a jour un livre',
            path: '/admin/edit-book',
            editing: editMode,
            book: book
        })   
    }).catch(err => console.log(err))
}


// UPDATE
exports.postEditBook = (req, res, next) => {
    const bookId = req.body.bookId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    Book.findByPk(bookId).then(book => {
        book.title =updatedTitle;
        book.price =updatedPrice;
        book.imageUrl =updatedImageUrl;
        book.description =updatedDescription;
        return book.save();
    }).then(result => {
        console.log('Livre mis à jour')
        res.redirect('/admin/books')
    }).catch(err => console.log(err))
}


// DELETE
exports.deletBook = (req, res, next) => {
    const bookId = req.body.bookId;
    Book.findByPk(bookId).then(book => {
        return book.destroy();
    }).then(result => {
        console.log('Livre supprimer')
        res.redirect('/admin/books')
    }).catch(err => console.log(err))
}