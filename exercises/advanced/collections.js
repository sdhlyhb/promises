/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
var fs = require('fs');
const Promise = require('bluebird');
const fsPromisify = Promise.promisifyAll(fs);
var promisification = require('../bare_minimum/promisification');
var promiseConstructor = require('../bare_minimum/promiseConstructor');

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  // TODO
  var promises = filePaths.map(filePath => promiseConstructor.pluckFirstLineFromFileAsync(filePath).
    then (firstLine => fsPromisify.writeFileAsync(writePath, firstLine + '\n', 'utf8')


    ));

  return Promise.all(promises).then(text => console.log(`${text}`))
    .catch (err => console.log('err'));








  /************************************/
  // return Promise.all(filePaths.map(filePath => {
  //   return promiseConstructor.pluckFirstLineFromFileAsync(filePath)
  //     .then ((firstLine) => fsPromisify.writeFileAsync(writePath, firstLine + '\n', 'utf8'));

  // })).then ((data) => console.log('success!'))
  //   .catch(err => console.log(err));


};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};