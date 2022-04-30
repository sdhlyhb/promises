// You should only use the `new Promise` constructor from bluebird
var Promise = require('bluebird');

/**
 * Return a function that wraps `nodeStyleFn`. When the returned function is invoked,
 * it will return a promise which will be resolved or rejected, depending on
 * the execution of the now-wrapped `nodeStyleFn`
 *
 * In other words:
 *   - If `nodeStyleFn` succeeds, the promise should be resolved with its results
 *   - If nodeStyleFn fails, the promise should be rejected with the error
 *
 * Because the returned function returns a promise, it does and should not
 * expect a callback function as one of its arguments
 */

var promisify = function(nodeStyleFn) {
  // TODO
  return function (...args) { // return a wrapper-function (*)
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line func-style
      function customeCallback(err, result) { // our custom callback
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      }

      args.push(customeCallback); // append our custom callback to the end of f arguments

      nodeStyleFn.call(this, ...args); // call the original function
    });
  };
};


/**
 * Given an array which contains promises, return a promise that is
 * resolved if and when all the items in the array are resolved.
 *
 * The promise's resolve value should be an array that maps to the
 * respective positions in the original array of promises.
 *
 * If any promise in the array rejects, the returned promise
 * is rejected with the rejection reason.
 */

var all = function(arrayOfPromises) {
  // TODO
  return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;

    arrayOfPromises.forEach((value, index) => {
      Promise.resolve(value).then(result => {
        results[index] = result;
        completed++;

        if (completed === arrayOfPromises.length) {
          resolve(results);
        }
      }).catch(err => reject(err));
    });
  });
};


/**
 * Given an array of promises, return a promise that is resolved or rejected,
 * resolving with whatever the resolved value or rejection reason was from
 * the first to be resolved/rejected promise in the passed-in array
 */

var race = function(arrayOfPromises) {
  // TODO
  return new Promise((resolve, reject) => {

    arrayOfPromises.forEach((promise) => {
      promise.then(resolve).catch(reject);

    });
  });
};

// Export these functions so we can unit test them
module.exports = {
  all: all,
  race: race,
  promisify: promisify
};
