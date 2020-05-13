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
    const book = new Book(null, title, imageUrl, description, price); // creation d'une instance de Book et le parametre demandé est un titre
    book.save() // "book" est la variable declaré a la ligne du dessus. On fait appel a la methode qui se situe dans le controller => elle va pusher dans le tableau
        .then(() => {
            res.redirect('/');
        })
        .catch(err => console.log(err))
};

// affiche la liste de livres partie admin
exports.getBooks = (req, res) => {
    Book.fetchAll()
        .then(([books]) => {
            res.render('admin/books', {
                pageTitle: 'Admin liste des lives',
                path: '/',
                books: books
            });    
        })
        .catch(err => console.log(err))
}


// mettre a jour un livre
exports.getEditBook = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const bookId = req.params.bookId;
    Book.getBooksById(bookId)
        .then(([book]) => {
            res.render('admin/edit-book', {
                pageTitle: 'Mettre a jour un livre',
                path: '/admin/edit-book',
                editing: editMode,
                book: book[0]
            })    
        })
        .catch(err => console.log(err));
}


// UPDATE
exports.postEditBook = (req, res, next) => {
    const bookId = req.body.bookId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedBook = new Book(bookId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
    updatedBook.update(bookId)
        .then(() => {
            res.redirect('/admin/books');
        })
        .catch(err => console.log(err))
}


// DELETE
exports.deletBook = (req, res, next) => {
    const bookId = req.body.bookId;
    Book.deleteBookById(bookId)
        .then(([book]) => {
            res.redirect('/admin/books');
        })
        .catch(err => console.log(err))
}