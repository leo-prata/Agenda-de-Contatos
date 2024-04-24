/*const homeModel = require("../models/homeModel");

homeModel
  .create({
    titulo: "Primeiro título!",
    descricao: "Descrição de teste",
  })
  .then((dados) => {
    console.log(dados);
  })
  .catch((e) => {
    console.log(e);
  });
*/

exports.PaginaInicial = (req, res) => {
  res.render("index", {
    titulo: "Este será o título da página",
    numeros: [0, 1, 2, 3],
  });
  return;
};

exports.trataPost = (req, res) => {
  res.send(req.body);
  return;
};
