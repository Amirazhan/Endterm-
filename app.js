var http = require('http');
var fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode) {
    if (!responseCode) { responseCode =  200; }
    fs.readFile(__dirname + path, function(err, data) {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end("500 - Internal Error");
        }
        else {
            res.writeHead(responseCode, {'Content-Type' : contentType});
            res.end(data);
        }
    })
}

http.createServer(function(req, res) {
    var path = req.url.replace(/[^a-zA-Z\d\/ ]/g, '').toLowerCase();
    console.log(path);
    switch(path) {
        case '/':
            serveStaticFile(res, '/index.html', 'text/html');
            break;
        case '/about':
            serveStaticFile(res, '/about.html', 'text/html');
            break;
        case '/img/gallery/iitu':
            serveStaticFile(res, '/img/iitu.jpg', 'image/jpeg');
            break;
        case '/img/gallery/aitu':
            serveStaticFile(res, '/img/logo.jpg', 'image/jpeg');
            break;
        case '/video/video1':
            serveStaticFile(res, '/video/mp4.mp4', 'video/mp4');
            break;
        case '/video/video2':
            serveStaticFile(res, '/video/video2.mp4', 'video/mp4');
            break;
        default:
            serveStaticFile(res, '/error.html', 'text/html', 404);
            break;
    }
}).listen(3000);

console.log("Server started on localhost:3000; press Ctrl+C to terminate");