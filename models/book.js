
const Cart = require('./cart');


// création d'une classe Book
module.exports = class Book 
{
    constructor(id, title, imageUrl, description, price)// on affiche qu'un titre
    {
        this.id = id;
        this.title = title; // dans notre objet courant, le titre sera egale a ce qu'on passe au constructeur
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }


    // methode qui permet de sauvegarder
    //methode qui permet de recupèrer ce qui a été fait dans la methode "getBookFromJson"
    save()
    {
    }


    // methode statique qui va tout récuperer
    // for the get all
    static fetchAll(callback)
    {
    }

    // for the get by id
    static getBooksById(id, callback)
    {
        getBookFromJson(books => {
            const book = books.find(bk => bk.id === id);
            callback(book);
        })
    }


    // for the delete by id
    static deleteBookById(id)
    {
    }
}