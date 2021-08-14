const Queue = require('bee-queue');
const { saveFileToS3 } = require('../../services/s3');

const options = {
  removeOnSuccess: false,
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
};

const timeQueue = new Queue('time', options);
timeQueue.process(3, (job, done) => {
  const { tempFilePath, name, dir } = job.data;
  try {
    saveFileToS3({ tempFilePath, name }, dir)
      .then(() => {
        console.log('upload success:  ', `${tempFilePath}/${name}`);
        done();
      })
      .catch(e => {
        console.log(`upload failed:  ${tempFilePath}/${name} - reason: `, e.message);
      });
    // done();
  } catch(error) {
    console.log('------Upload error: ', error.message);
    throw error;
  }
});

timeQueue.on('succeeded', (job, result) => {
  console.log('!!!!!!!!!!!!!!!!!success:');
});

//PUBLISHER
const syncTime = (order) => {
  return timeQueue.createJob(order).save();
};

module.exports.syncTime = syncTime;
