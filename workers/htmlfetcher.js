var archive = require('../helpers/archive-helpers');
var fs = require('fs');

// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

exports.workerAction = function () {
  console.log('starting worker');
  archive.readListOfUrls(function (array) {
    fs.writeFile(archive.paths.list, '', function () {
      array.forEach(function (url) {
        console.log ('we got in here');
        archive.isUrlArchived(url, function (exists) {
          var results = [];
          if (!exists) {
            results.push(url);
            console.log('urls we want to download: ', results);
            archive.downloadUrls(results);
          }  
        });  
      });
    });
  });

};