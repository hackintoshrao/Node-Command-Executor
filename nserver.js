var http=require('http'),
	url = require('url'),
	mime = require('mime'),//npm install mime
	fs = require('fs'),
	search_path='/home/karthic/mydata/codes';
http.createServer(function(req,res) {
	 pathname = search_path + req.url;
	 console.log(req.url);
	 if(req.url == '/ls' ){
                var spawn = require('child_process').spawn,
		ls = spawn('ls');
		ls.stdout.on('data', function (data) {
		console.log('stdout: ' + data);
		res.writeHead(200);
		res.write('Getting the Directory listing.....');
		res.write(data);
		res.end();
		
		});
		ls.stderr.on('data', function (data) {
		console.log('stderr: ' + data);
		});
ls.on('exit', function (code) {
console.log('child process exited with code ' + code);
	});
		
	}
	 console.log(pathname);

	fs.stat(pathname , function(err,stats){
	  if(err) { 
		res.writeHead(404);
		res.write('Bad Request , Request cannot be accepted');
		res.end()
		}
	else if(stats.isFile()) {
		//content-type
		var type = mime.lookup(pathname);
		console.log(type);
		res.setHeader('Content-Type',type);

		// 200 status - found , no errors 
		res.statusCode = 200;
	
		//create a readable stream and pipe to the http response 
		var file = fs.createReadStream(pathname);
		file.on("open",function() { 
			file.pipe(res);
		});
		file.on("error",function(err) {
			cosole.log(err);
		});
	     }
	else {
		res.writeHead(403);
		res.write('Cannot Access Directory');
		res.end();
		}
	});
}).listen(8124);
console.log('Server running at 8124');
		
