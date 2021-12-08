"use strict";

const fs = require("fs");
var jwt = require("jsonwebtoken");

var privateKey = fs.readFileSync("./private.key", "utf8");
var publicKey = fs.readFileSync("./public.key", "utf8");

var payload = {};
payload.userName = "Artkabis";
payload.userId = "000111222333";
payload.role = "admin";
payload.language = "JavaScript";

console.log("\n Payload: " + JSON.stringify(payload));

const NAME = "Artkabis";
const MAIL = "artkabis.jwtRSA@gmail.com";
const WORKS = "https://github.com/artkabis";
const EXPIRE = "24h";
const TOKEN_TYPE = "RS256";
//Doc JWT registre de renvendication de nom : https://datatracker.ietf.org/doc/html/rfc7519#section-4.1
var signOptions = {
  issuer: NAME, //émmetteur
  subject: MAIL, //Sujet
  audience: WORKS, //audience
  expiresIn: EXPIRE, //expiration token
  algorithm: TOKEN_TYPE, //type de l'algo
};
// Creation du JWT token
var token = jwt.sign(payload, privateKey, signOptions);

// Envoie de ce token côté client afin de l'utiliser dans la requête suivante
console.log("\n Token: " + token);

//==================================================================================
//                      token verification
//==================================================================================
var verifyOptions = {
  issuer: NAME,
  subject: MAIL,
  audience: WORKS,
  expiresIn: EXPIRE,
  alglgorithm: TOKEN_TYPE,
};
var jwtVerif = jwt.verify(token, publicKey, verifyOptions);
console.log(typeof jwtVerif);
console.log("\n Token vérifié : " + JSON.stringify(jwtVerif));

var decoded = jwt.decode(token, { complete: true });
console.log("\n Décodage du Header: " + JSON.stringify(decoded.header));
console.log("\n Décodage du Payload: " + JSON.stringify(decoded.payload));
console.log(
  "\n Details de l'utilisateur " +
    payload.userId +
    " - " +
    payload.userName +
    " est envoyé au client côté back"
);
