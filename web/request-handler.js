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


        //console.log('---------------', fixture);
    //var fixture;
    //console.log('outside of on');
    // req.on('data', function(chunk) {
    //   fixture = chunk + '';
    // });
    // req.on('end', function() {
    //   //console.log('---------------', fixture);
    //   if (fixture === '/web/public/index.html') {
    //     fixture = './web/public/index.html';
    //     helpers.getResponse(fixture);
    //   } else 
    //   }
      
    //});
    //helpers.getResponse(archive.paths.archivedSites + '/' + fixture);
  }  
};
    
          


    













    
    
  




  //res.end('/<input/');



