const db = require('../helper/database');
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
        return db.execute("INSERT INTO books (title, imageUrl, price, description) VALUES (?, ?, ?, ?)", 
        [this.title, this.imageUrl, this.price, this.description])
    }


    update(id)
    {
        return db.execute("UPDATE books SET title = ?, imageUrl = ?, price = ?, description = ? WHERE books.id = ?", 
        [this.title, this.imageUrl, this.price, this.description, id])
    }


    // for the get all
    static fetchAll()
    {
        return db.execute('SELECT * FROM books'); // le fait de retourner est considéré comme une promise
    }

    // for the get by id
    static getBooksById(id)
    {
        return db.execute('SELECT * FROM books WHERE books.id = ?', [id]);
    }


    // for the delete by id
    static deleteBookById(id)
    {
        return db.execute('DELETE FROM books WHERE books.id = ?', [id])
    }
}