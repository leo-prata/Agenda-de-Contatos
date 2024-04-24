exports.middlewareGlobal = (req, res, next) => {
  res.locals.umaVarLocal = "Este é o valor da variavel local";
  console.log("Passei no middleware global");
  next();
};

exports.outroMiddleware = (req, res, next) => {
  next();
};

exports.checkCsrfEror = (err, req, res, next) => {
  if (err) {
    return res.render("404");
  }

  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
