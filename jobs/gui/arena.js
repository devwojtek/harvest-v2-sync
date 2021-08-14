const queues = require("../queues/index")
  , Bee = require("bee-queue");

module.exports = {
  Bee,
  queues: Object.keys(queues).map(key => {
    return {
      name: queues[key].name, // Name of the queue
      url: process.env.REDIS_URL,
      hostId: queues[key].hostId,
      type: 'bee'
    };
  }),
  customJsPath: '/js/custom-harvest.js',
  customCssPath: '/js/style.css'
};
