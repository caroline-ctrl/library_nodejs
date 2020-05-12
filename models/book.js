const fs = require('fs');
const path = require('path'); // besoin du path pour utiliser les chemins
const rootPath = require('../helper/path-helper');
const Cart = require('./cart');

// on ne va pas chercher le titre dans un table mais maintenant dans un fichier, 
// donc le tableau n'a plus d'utilité
// const books = [];

// on ne stocke plus dans un tableau mais dans un dossier "data" dans un fichier "books.json" sous la forme d'un json
// on fait appel a "path" auquel on join le "path-helper", un dossier "data" dans lequel il y aura un fichier "books.json"
const pt = path.join(rootPath,  'data', 'books.json');

// methode qui va lire le fichier "books.json"
// callback permet de faire de l'asynchrone
//const getBookFromJson = function (callback) {} = callback est donc une fonction qui prend en argument books (argument de la fonction anonyme)
const getBookFromJson = callback => {
//  fs.readFile(pt, function(err, fileContent) {})
    fs.readFile(pt, (err, fileContent) => { // lire le fichier que l'on trouve au niveau de "pt" (path)
        if (err) { // si erreur return le callback sous forme d'un tableau vide
            return callback([]);
        } else { // sinon utilise le callback, on fait appel a un objet JSON, on va parser (boucler) le contenu du fichier (fileContent) et retourn a travers le callback
            callback(JSON.parse(fileContent));
        }
    });
}

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
    {// getBookFromJson(function(books) {})
        getBookFromJson(books => { // "books" remplace le callback
        // for the update
            if(this.id) { // on verifie qu'il y ai bien un id
                const existingBookIndex = books.findIndex(book => book.id === this.id); // permet de trouver le livre associé a l'id
                const updatedBooks = [...books]; 
                updatedBooks[existingBookIndex] = this;
                fs.writeFile(pt, JSON.stringify(updatedBooks), err => {
                    console.log(err);
                })
                //for the create
            } else {
                this.id = Math.random().toString();
                books.push(this) // prend le tableau book et pousse a l'interieur du tableau l'objet courant qui sera utilisé (this).
                fs.writeFile(pt, JSON.stringify(books), err => {// on ecrit dans le fichier au niveau du path, stingify qui converti en string le tableau de books
                    console.log(err);
                })
            }
        })
    }


    // methode statique qui va tout récuperer
    // for the get all
    static fetchAll(callback)
    {
        getBookFromJson(callback); // fait reference a la methode save()
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
        getBookFromJson(books => {
            const book = books.find(bk =>bk.id === id); // on cherche le livre avec l'id
            const booksAfterDelete = books.filter(bk => bk.id !== id); // on filtre le tableau pour enlever les id ne correspondant pas
            fs.writeFile(pt, JSON.stringify(booksAfterDelete), err => {
                console.log(err);
                if (!err){
                    // supprime le tout dans le panier a ce produit
                    Cart.deleteBook(id, book.price);
                }
            })
        })
    }
}