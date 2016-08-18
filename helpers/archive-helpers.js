var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish. 
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};
 
// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

//When a url is added to list, worker will go find that site in list
//Once done, the worker will archive that url;

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  var result;
  fs.readFile(exports.paths.list, function(error, data) {
    result = data + '';
    var arr = result.split('\n');
    callback(arr);
  });
};

exports.isUrlInList = function(target, callback) {
  
  exports.readListOfUrls(function(urls) {
    var arr = urls.filter(function(url) {
      return url === target;
    });
    if (arr.length > 0) {
      callback(true);
    } else {
      callback(false);
    }
  }); 

};

exports.addUrlToList = function(target, callback) {
  console.log(target);
  fs.appendFile(exports.paths.list, target + '\n', function() {
    callback();
    console.log('where we are writing (supposedly)', exports.paths.list);
  });
};

exports.isUrlArchived = function(target, callback) {
  var exist = true;
  fs.access(exports.paths.archivedSites + '/' + target + '.html', (err) => {
    exist = err ? false : true;
    console.log(exist, err);
    callback(exist);
  });

};

exports.downloadUrls = function(array) {

  array.forEach(function (url) {
    var create = fs.createWriteStream(exports.paths.archivedSites + '/' + url + '.html');
    create.end();
    console.log('before get request');
    http.get({
      host: url,
      port: 80,
      path: '/index.html'  
    }, function(response) {
      console.log('inside request');
      var str = '';
      response.on('data', function (chunk) {
        console.log('chunk is now', chunk);
        str += chunk + '';
        console.log('that which well print', str);
      });

  //the whole response has been recieved, so we just print it out here
      response.on('end', function () {
        console.log('url is', url);
        fs.appendFile(exports.paths.archivedSites + '/' + url + '.html', str, function(error, data) {
          console.log('we wrote something maybe', error, data);
        });
      });
    });
  });


    // fs.writeFile(exports.paths.archivedSites, url, function() {
    //   console.log('new file written! :', url);
    //   exports.isUrlArchived(url, function(exist) {
    //     console.log('does it exist?', exist);
    //   });
    // });
  
};
