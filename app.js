// require permet d'inclure le module http
// fonction qui permet d'utiliser le serveur et le client HTTP donc de transferer des données via le protocole http
const http = require('http');
// permet de mapper/router les demandes http
// require('./routes') = car on a créé le module dans le fichier route.js et ./ pour localiser le module dans ce fichier
// const routes = require('./routes');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminRoute = require('./routes/admin');
const libraryRoute = require('./routes/library');
const errorController = require('./controllers/errors');

const app = express ();

// pour ejs
app.set('view engine', 'ejs');

// pour parcer
app.use(bodyParser.urlencoded({extended: true}));

// pour le css
app.use(express.static(path.join(__dirname, 'public')));

// se servir des deux routes
app.use('/admin', adminRoute.routes);
app.use(libraryRoute);

// page 404
// fait appel
app.use(errorController.get404)

// port 3000
app.listen(3000);

// methode qui permet de créer le serveur = transforme l'ordi en seveur http
// la methode http.createServer() crée un objet http serveur
// const server = http.createServer(routes);
// const server = http.createServer(app);


// sur le port 3000
// server.listen(3000);

