exports.AuthMiddleware = () => (req, res, next) => {
  if (req.session && req.session.user) {
    next();
    return;
  }
  res.redirect('/auth');
};
