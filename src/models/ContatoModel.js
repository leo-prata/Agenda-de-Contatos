const mongoose = require("mongoose");
const validator = require("validator");

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  telefone: { type: String, required: false, default: "" },
  dataCriacao: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model("Contato", ContatoSchema);

class Contato {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
  }

  static async buscaPorId(id) {
    if (typeof id !== "string") {
      return;
    }
    const contato = await ContatoModel.findById(id);
    return contato;
  }

  async register() {
    this.valida();

    if (this.errors.length > 0) {
      return;
    }

    this.contato = await ContatoModel.create(this.body);
  }

  valida() {
    if (this.body.email && !validator.isEmail(this.body.email)) {
      this.errors.push("Email inválido");
    }
    if (!this.body.nome) {
      this.errors.push("Nome é um campo obrigatório");
    }

    if (!this.body.email && !this.body.telefone) {
      this.errors.push(
        "Pelo menos um dos campos Email ou Telefone deve estar preenchido"
      );
    }

    this.cleanUp();
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    this.body = {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      telefone: this.body.telefone,
    };
  }

  async edit(id) {
    if (typeof id !== "string") {
      return;
    }
    this.valida();
    if (this.errors.length > 0) {
      return;
    }
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {
      new: true,
    });
  }
}

module.exports = Contato;
