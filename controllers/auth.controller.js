// Authenticate to harvest
exports.index = (req, res) => {
  res.render('auth/index');
}

exports.login = (req, res) => {
  res.json({
    success: true
  })
}

// Authenticate to harvest
exports.showAccounts = (req, res) => {
  const accounts = req.session.accounts;

  res.render('auth/account_selector', { accounts });
}
