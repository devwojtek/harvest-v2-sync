const { syncTime } = require('../jobs/queues/process')
  , fs = require('fs')
  , { basePath } = require('../config/constants')
  , { writeFile } = require('../helpers/files');

// Show dashboard
exports.index = (req, res) => {
  res.render('user/index');
}

// Show user detail
exports.getUserById = async (req, res) => {
  const { accountId } = req.params;
  const user = req.session && req.session.user ? req.session.user : { id: accountId };
  res.render('user/detail', { user });
}

exports.syncUserInfo = (req, res) => {
  const { accountId } = req.params;
  const today = new Date();
  const month = today.getMonth()+1;
  const date = today.getDate()+1;
  const to = `${today.getFullYear()}${('00'+month).slice(-2)}${('00'+date).slice(-2)}`;

  req.fetch.get(`/v2/reports/time/clients?from=20210101&to=${to}`)
    .then(data => {
      console.log('time data: ', data);

      writeFile(
        `${basePath}/tmp/${accountId}`,
        `${to}.json`,
        JSON.stringify(data.data)
      );

      syncTime({
        tempFilePath: `/tmp/${accountId}`,
        name: `${to}.json`
      })
        .then(() => res.redirect(`/${accountId}`))
        .catch(error => {
          console.log("~~~~~~:", error.message);
          res.render('error', { errorMsg: error.message });
        });
    })
    .catch(error => {
      console.log("~~~catche~~~:", error.request.data);
      res.render('error', { errorMsg: error.message });
    });
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
