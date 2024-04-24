const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const perfilController = require("./src/controllers/perfilController");

//? Rotas da HOME
route.get("/", homeController.PaginaInicial);
route.post("/", homeController.trataPost);

//? Rotas do /perfil
route.get("/perfil", perfilController.PaginaInicial);

module.exports = route;
