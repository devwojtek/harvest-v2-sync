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
  // const accounts = req.session.accounts;
  const accounts = [
    {
      "id": 10254,
      "name": "Sterling Cooper Advertising Agency",
      "product": "harvest"
    },
    {
      "id": 88888,
      "name": "Iridesco",
      "product": "forecast"
    }
  ];

  res.render('auth/account_selector', { accounts });
}
