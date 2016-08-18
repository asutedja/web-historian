var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, './archives/sites.txt')
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
  fs.appendFile(exports.paths.list, target + '\n', function() {
    callback();
  });
};

exports.isUrlArchived = function(target, callback) {
  var exist = true;
  fs.access(exports.paths.archivedSites + '/' + target, (err) => {
    exist = err ? false : true;
    callback(exist);
  });

};

exports.downloadUrls = function(array) {
  
};
