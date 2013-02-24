var http = require('http');
var fs = require('fs').createWriteStream('file1');;

http.createServer(function(req, res) {
  // This opens up the writeable stream to `output`
  

  // This pipes the POST data to the file
  req.pipe(fs,{ end:false });

  // After all the data is saved, respond with a simple html form so they can post more data
  req.on('end', function () {
    res.writeHead(200, {"content-type":"text/html"});
    res.end('<form method="POST"><input name="test" /><input type="submit"></form>');
  });

  // This is here incase any errors occur
  fs.on('error', function (err) {
    console.log(err);
  });
}).listen(8080);
