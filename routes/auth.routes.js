var router = require('express').Router()
  , passport = require('passport')
  , { getAccounts } = require('../services')
  , { AuthMiddleware } = require('../middlewares/auth')
  , authController = require('../controllers/auth.controller.js');

router.get('/login', function(req, res, next) {
  req.headers['User-Agent'] = `${process.env.HARVEST_APP} (${process.env.HARVEST_EMAIL})`;
  passport.authenticate('oauth2')(req, res, next);
}, authController.login);

router.get('/callback',
  passport.authenticate('oauth2', { failureRedirect: '/auth-error' }),
  async function(req, res, done) {
    try {
      const currentUser = await getAccounts(req.user);
      req.session.accessToken = req.user;
      req.session.user = currentUser.user;
      req.session.accounts = currentUser.accounts;

      if (currentUser.accounts && currentUser.accounts.length > 0) {
        console.log("++++Harvest-Account-Id+++++", currentUser.accounts[0].id);
        req.fetch.defaults.headers.common['Harvest-Account-Id'] = currentUser.accounts[0].id;
      }
      if (req.user) {
        console.log("++++Authorization+++++", req.user);
        req.fetch.defaults.headers.common['Authorization'] = `Bearer ${req.user}`;
      }
    } catch(e) {
      console.log('Get account error: ', e);
    }

    // Successful authentication, redirect user list.
    res.redirect('/');
  }
);

router.get('/account_selector', AuthMiddleware(), authController.showAccounts);
router.get('/', authController.index);

module.exports = router;
