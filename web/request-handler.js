var path = require('path');
var archive = require('../helpers/archive-helpers');
var headers = require('./http-helpers.js');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!





exports.handleRequest = function (req, res) {
  


  var helpers = {
    getResponse: function(status, filepath) {
      res.writeHead(status, headers.headers);
      if (status === 404) {
        console.log(status);
        res.end();
      } else {
        fs.readFile(filepath, function(error, data) {
          var parse = data + '';
          //console.log('this is the result:::::::::', parse);
          res.end(parse);
        });

      }
    }
  };





  if (req.method === 'GET') {

    var pathDestination = req.url;

    var exist = false;
    fs.access(archive.paths.archivedSites + '/' + pathDestination, (err) => {
      exist = err ? false : true;
      if (pathDestination === '/') {
        fixture = './web/public/index.html';
        helpers.getResponse(200, fixture);
      } else if (exist) {
        helpers.getResponse(200, archive.paths.archivedSites + '/' + pathDestination);
      } else if (exist === false) {
        res.writeHead(404, headers.headers);
        res.end();
      }
    });
  } else if (req.method === 'POST') {
    // console.log(req.data);
    var str;
    req.on('data', function(chunk) {

      var fixture = chunk + '';
      console.log('chunk is', fixture);
      str = fixture.slice(4);
    });
    req.on('end', function() {
      console.log('string is now!:', str);
      archive.addUrlToList(str, function() {
        res.writeHead(302, headers.headers);
        console.log('callback');
        res.end();
      });      
    });
  }
};

  //res.end('/<input/');



