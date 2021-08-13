const { saveFileToS3 } = require('../services/s3');

// Show dashboard
exports.index = (req, res) => {
  res.render('user/index');
}

// Show user detail
exports.getUserById = async (req, res) => {
  const { accountId } = req.params;
  res.render('user/detail', { user: { id: accountId, name: 'Test User'}})

  // req.fetch.get(`/v2/users/${userId}`)
  //   .then(data => {
  //     res.render('user/detail', { user: data.data });
  //   })
  //   .catch(err => {
  //     console.log(err.config);
  //     res.render('error', { errorMsg: err.message });
  //   })
}

exports.syncUserInfo = async (req, res) => {
  const { accountId } = req.params;
  try {
    const data = await saveFileToS3({
      tempFilePath: '/tmp',
      name: 'auth.json'
    })
    console.log("res: ", data);
  } catch(e) {
    console.log("------Upload error: ", e.message);
  }
  res.redirect(`/${accountId}/jobs`);
}

// Show jobs
exports.getJobsByUserId = async (req, res) => {
  const { accountId } = req.params;
  res.render('user/jobs');
}

// Show job detail
exports.getJobById = async (req, res) => {
  const { accountId, jobId } = req.params;
  res.render('user/job-detail');
}
