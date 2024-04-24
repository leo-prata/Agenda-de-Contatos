require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose
  .connect(process.env.CONNECTIONSTRING)
  .then(() => {
    console.log("Conectado ao database");
    app.emit("Pronto");
  })
  .catch((e) => console.log(e));

// a

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const routes = require("./routes");
const path = require("path");
//const helmet = require("helmet");
const csrf = require("csurf");
const {
  middlewareGlobal,
  checkCsrfEror,
  csrfMiddleware,
} = require("./src/middlewares/middleware");

//app.use(helmet());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, "public")));

const sessionOptions = session({
  secret: "akufuafwrbgvauyn",
  store: new MongoStore({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
    httpOnly: true,
  },
});

app.use(sessionOptions);
app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(csrf());
// Nossos próprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfEror);
app.use(csrfMiddleware);
app.use(routes);

// tem que captar o sinal emitido por "app.emit", no caso foi o "Pronto"
app.on("Pronto", () => {
  app.listen(3000, () => {
    console.log("Servidor executando na porta 3000");
  });
});

//!link conexão mongoDbAtlas: mongodb+srv://leoprata:<password>@cursojs.zyvlxui.mongodb.net/?retryWrites=true&w=majority&appName=cursoJS
