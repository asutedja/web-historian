var archive = require('../helpers/archive-helpers');
var fs = require('fs');

// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

exports.workerAction = function () {
  console.log('starting worker');
  archive.readListOfUrls(function (array) {
    fs.writeFile(archive.paths.list, '', function () {
      var results = [];
      array.forEach(function (url) {
        archive.isUrlArchived(url, function (exists) {
          if (!exists) {
            results.push(url);
            console.log('urls we want to download: ', results);
          }  
        });  
      });
      console.log('array of urls we want to download: ', results);
      archive.downloadUrls(results);
    });
  });

};