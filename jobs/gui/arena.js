const queues = require("../queues/index");

module.exports = {
  queues: Object.keys(queues).map(key => {
    return {
      // Name of the bull queue, this name must match up exactly with what you've defined in bull.
      name: queues[key].name,
      // interface RedisUrlConnectionOptions { url: string;}
      url: process.env.REDIS_URL,
      // Hostname or queue prefix, you can put whatever you want.
      hostId: "my_svc"
    };
  })
};
