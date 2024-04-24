exports.middlewareGlobal = (req, res, next) => {
  res.locals.umaVarLocal = "Este é o valor da variavel local";
  console.log("Passei no middleware global");
  next();
};

exports.outroMiddleware = (req, res, next) => {
  next();
};

exports.checkCsrfEror = (err, req, res, next) => {
  if (err && err.code === "EBADCSRFTOKEN") {
    //codigo erro csrf
    return res.send("BAD CSRF");
  }
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
