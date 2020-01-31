const redis = require("redis");
const client = redis.createClient(6379);

let methods = {};

methods.cacheCustomerDataPost = function(data) {
  client.set(data.name, JSON.stringify(data));
};

methods.cacheCustomerDataGet = function(data) {
  return new Promise((resolve, reject) => {
    client.get(data.name, (err, data) => {
      if (err) {
        throw err;
      }
      if (data) {
        resolve(data);
      } else {
        resolve(null);
      }
    });
  });
};
module.exports = methods;
