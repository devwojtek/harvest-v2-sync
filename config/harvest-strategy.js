require('dotenv').config();
const OAuth2Strategy = require('passport-oauth2')
  , HARVEST_HOST = 'https://id.getharvest.com';

const harvestStrategy = new OAuth2Strategy({
  authorizationURL: `${HARVEST_HOST}/oauth2/authorize`,
  tokenURL: `${HARVEST_HOST}/api/v2/oauth2/token`,
  clientID: process.env.HARVEST_CLIENT_ID,
  clientSecret: process.env.HARVEST_CLIENT_SECRET,
  callbackURL: process.env.HARVEST_CALLBACK_URL
},
async function(accessToken, refreshToken, profile, done){
  process.nextTick(() => done(null, accessToken));
});

module.exports = harvestStrategy;
