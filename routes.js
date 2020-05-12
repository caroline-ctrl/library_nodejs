// // require permet d'inclure le module fs
// // API qui interagit avec le file systeme (CRUD + rename file)
// // permet de travailler avec le file systeme
// const fs = require('fs');

// // function qui a en arguments = 
//     // req (request = argument de demande http représente la demande du client) et 
//     // res (response = argument de reponse http)
// const requestHandler = (req, res) => {
//     // en combinant req et url, ca permet de determiner le fichier a servir. contient la partie de l'url qui vient après le nom de domaine
//     const url = req.url; 
//     // console.log(req.url);
//     const method = req.method;// permet de determiner la methode a utiliser lors de la request
//     // console.log(req.method);

//     // si l'url est egal a / alors affiche ce contenu
//     if(url === '/'){
//         // res.setHeader = definit les entete
//         res.setHeader('Content-Type', 'text/html');
//         // res.write = permet de renseigner du contenu, une reponse pour le client
//         res.write('<html>');
//         res.write('<head><title>Bienvenue</title></head>');
//         // un form en methode POST
//         // action renvoie le contenu de l'input vers l'url /test donc la condition qui suit
//         res.write('<body><form action="/test" method="POST"> <input type="text" name="message"/><button type="submit">Envoyer Message</button></form></body>');
//         res.write('</html>');
//         // met fin au processus de reponse (methode de http.ServerResponse)
//         return res.end();
//     }

//     // si l'url est /test ET la method est POST
//     if (url === '/test' && method === 'POST'){
//         // variable qui contient un tableau vide
//         const body = [];
//         // req.on = est une methode utilisée pour lier le gestionnaire d'évenement, lie un evenement a un objet
//         // recupère donc le contenu de l'input de la condition d'avant
//         // chunk est un tampon qui est utilisé pour stocker des données binaires, donc les données de l'input
//         req.on('data', (chunk) => {
//             console.log(chunk);
//             // ensuite, push envoie les données dans le tableau body qui était vide
//             body.push(chunk);
//             console.log(body);
//         });
//         // evenement de fin avec une methode qui permet de transformer le contenu du tableau en string
//         return req.on('end', () => {
//             // buffer est une memoire brute, un tableau qui stock en octet
//             // concat est une methode qui joint tous les buffer d'un tableau en un seul
//             // ce sont des données binaire, il faut donc les convertir en string
//             const parsedBody = Buffer.concat(body).toString('utf-8');
//             console.log(parsedBody);
//             // split = divise la chaine de caractère
//             // le contenu de parsedBody est coupé au niveau du = et renvoie le 2ème element
//             const message = parsedBody.split('=')[1];
//             // fs.writeFile = methode qui remplace le fichier et le contenu spéficiés s'ils existent. 
//             // Si le fichier n'existe pas,un nouveau sera créé contenant le contenu spécifié
//             // dans "message.txt" y mettre le contenu de message
//             // si erreur envoie un statuscode 302 et redirige sur la page d'accueil
//             fs.writeFile('message.txt', message, (err) => {
//                 res.statusCode = 302;
//                 res.setHeader('location', '/'); // forme de redirection
//                 // met fin au processus de reponse (methode de http.ServerResponse)
//                 return res.end();
//             });
//         });

//     }

//     // si un utilisateur rentre une autre url que ce qui est renseigné, une erreur ressort = 404
//     res.statusCode = 404;
//     res.setHeader('Content-Type', 'text/html');
//     res.write('<html>');
//     res.write('<head><title>Erreur 404</title></head>');
//     res.write('<body><h1>Erreur 404</h1></body>');
//     res.write('</html>');
//     return res.end();

// }

// // exports = permet d'exporter le module que l'on a créé. Rend disponible pour importer ailleur
// module.exports = requestHandler;