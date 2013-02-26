var http=require('http');
var fs = require('fs').createWriteStream('file1');;

http.createServer(function(req, res) {
  // This opens up the writeable stream to `output`
 	var msg=""; 

  // This pipes the POST data to the file
  //req.pipe(fs,{ end:false });

	req.on('data',function(formdata) {
		msg += formdata;

	
	});	


  // After all the data is saved, respond with a simple html form so they can post more data
  req.on('end', function () {
    	console.log(msg);
	res.writeHead(200, {"content-type":"text/html"});
    	res.end('<form method="POST"><input name="test" /><input type="submit"></form>');
  });

  // This is here incase any errors occur
  fs.on('error', function (err) {
    console.log(err);
  });
}).listen(8080);
//The executor part 
var exec = require('child_process').exec,
    child;

child = exec('cat *.js bad_file | wc -l',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});
