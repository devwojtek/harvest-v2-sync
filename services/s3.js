require('dotenv').config()

const fs = require('fs')
  , path = require('path')
  , AWS = require('aws-sdk');

const aws_config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_SECRET,
  region: process.env.AWS_REGION
}
var S3 = new AWS.S3(aws_config)

const signedUrlExpireSeconds = 3600

const saveFileToS3 = async (file, upDir = 'demo_cloud',  upKey = '',) => {
  const basePath = path.dirname(__dirname);
  const filePath = path.join(basePath, file.tempFilePath, file.name);
  fs.existsSync(filePath);
  const readable = fs.createReadStream(filePath);
  // const ext = path.extname(file.name);
  const key = upDir + `/${upKey}${file.name}`
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: readable
  }
  if (file.mimetype) {
    params.ContentType = file.mimetype
  }

  return new Promise((res, rej) => S3.upload(params, async function(err, data) {
    if (err) {
      rej(err)
    } else {
      res(data)
      fs.unlinkSync(filePath)
    }
  }))
}

const getS3Link = (key) => {
  if (!key) {
    return ''
  }
  const url = S3.getSignedUrl('getObject', {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Expires: signedUrlExpireSeconds
  })
  return url
}

module.exports = {
  saveFileToS3,
  getS3Link
}
