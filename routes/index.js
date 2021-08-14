var router = require('express').Router();
const { AuthMiddleware } = require('../middlewares/auth');

router.use('/auth-error', function (req, res) {
  res.render('error',  {
    errorMsg: 'Authentication failed'
  });
});

router.use('/auth', require('./auth.routes'));
router.use('/', require('./user.routes'));

module.exports = router;