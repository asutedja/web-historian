var path = require('path');
var archive = require('../helpers/archive-helpers');
var headers = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

var fixtures = {};




exports.handleRequest = function (req, res) {
  


  var helpers = {
    getResponse: function(filepath) {
      fs.readFile(filepath, function(error, data) {
        var parse = data + '';
        res.end(parse);
      });
    }
  };





  if (req.method === 'GET') {
    res.writeHead(200, headers.headers);
    var fixture;
    //console.log('outside of on');
    req.on('data', function(chunk) {
      fixture = chunk + '';
    });
    req.on('end', function() {
      console.log('---------------', fixture);
      if (fixture === '/web/public/index.html') {
        fixture = './web/public/index.html';
        helpers.getResponse(fixture);
      } else if (fixture[fixtures] !== true) {
        //console.log('---------------', fixture);
        if ( fixtures[fixture] === undefined) {
          var file = path.join(archive.paths.archivedSites, fixture);
          fs.writeFile(file, 'hi');
          fixtures[fixture] = true; 
          helpers.getResponse(fixture);
        }
      }
      
    });
    fixture = './web/public/index.html';
    helpers.getResponse(fixture);
    //helpers.getResponse(archive.paths.archivedSites + '/' + fixture);
  }  
};
    
          


    













    
    
  




  //res.end('/<input/');



