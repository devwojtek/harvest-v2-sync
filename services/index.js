const axios = require('axios')
  , fetch = require('node-fetch')
  , { json } = require('body-parser');

require('dotenv').config();

const service = axios.create({
  baseURL: "https://api.harvestapp.com",
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

const success = (resolve, response) => resolve(response.data.data);
const successLogin = (resolve, response) => resolve(response.data);
const error = (reject, err) => reject(err);

const request = (method, url, data, config) => new Promise((resolve, reject) => {
  if (!(['get', 'post', 'put', 'patch'].includes(method))) throw new Error(`Http method ${method} does not supported`);

  if (['post', 'put', 'patch'].includes(method)) {
    // Data request
    /* eslint-disable */
    return axios({
      method,
      url,
      data,
      ...config,
    }).then(resp => url === '/oauth2/token' ? successLogin(resolve, resp) : success(resolve, resp))
    .catch(r => error(reject, r));
  }

  return service({
    method,
    url,
    params: data,
    ...config,
  }).then(resp => success(resolve, resp))
    .catch(r => error(reject, r));
});

const postApi = (url, data, config) => request('post', url, data, config);
const getApi = (url, query, config) => request('get', url, query, config);

const getAccounts = (token) => {
  return fetch("https://id.getharvest.com/api/v2/accounts",
    {
      headers: {
        'User-Agent': `${process.env.HARVEST_APP} (${process.env.HARVEST_EMAIL})`,
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(res => res)
      .catch(error => console.log(error))
}

module.exports = {
  postApi: postApi,
  getApi: getApi,
  axios: service,
  getAccounts: getAccounts
}
