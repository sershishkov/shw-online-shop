function addCsrfToken(req, res, next) {
  const token = req.csrfToken();
  // res.cookie('XSRF-TOKEN', token);
  res.locals.csrfToken = token;
  // console.log('res.locals.csrfToken', res.locals.csrfToken);
  next();
}

module.exports = addCsrfToken;
