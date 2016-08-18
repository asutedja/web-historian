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
    //console.log('PATH DESTINATION', pathDestination);
    var exist = false;
    fs.access(archive.paths.archivedSites + '/' + pathDestination, (err) => {
      exist = err ? false : true;
      //console.log(exist);
      if (pathDestination === '/') {
        fixture = './web/public/index.html';
        helpers.getResponse(200, fixture);
      } else if (exist) {
        // var file = path.join(archive.paths.archivedSites, fixture);
        // console.log('fileName', file);
        // fs.writeFile(file, 'hi');
        // fixtures[fixture] = true; 
        // helpers.getResponse(fixture);
        helpers.getResponse(200, archive.paths.archivedSites + '/' + pathDestination);
      } else if (exist === false) {
        //console.log('fails');
        res.writeHead(404, headers.headers);
        res.end();
      }
    });
  } else if (req.method === 'POST') {
    var str;
    req.on('data', function(chunk) {
      var fixture = chunk + '';
      str = fixture.slice(4);
    });

    req.on('end', function() {
      fs.appendFile(archive.paths.list, str + '\n', function() {
        res.writeHead(302, headers.headers);
        res.end();
      });
    });

  }


};
    


    













    
    
  




  //res.end('/<input/');



