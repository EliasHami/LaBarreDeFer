var http = require("http");
var fs = require('fs');
//kill node.js : taskkill /im node.exe /F

http.createServer(function (request, response) {
   
    if(request.url == '/'){
        response.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('../index.html', null, function (error, html_data) {
            if (error) {
                response.writeHead(404);
                response.write('Whoops! File not found!');
                response.write('error : ' + error);
            } else {
                response.write(html_data);
            }
            response.end();
        });

    }
     else if(request.url == '/bootstrap.min.css'){
        response.writeHead(200, {'Content-Type': 'text/css'});
        fs.readFile('../css/bootstrap.min.css', null, function (error, css_data) {
            if (error) {
                response.writeHead(404);
                response.write('Whoops! File not found!');
            } else {
                response.write(css_data);
            }
            response.end();
        });
    }
    else if(request.url == '/main.css'){
        response.writeHead(200, {'Content-Type': 'text/css'});
        fs.readFile('../css/main.css', null, function (error, css_data) {
            if (error) {
                response.writeHead(404);
                response.write('Whoops! File not found!');
            } else {
                response.write(css_data);
            }
            response.end();
        });
    }
    else if(request.url == '/jquery.min.js'){
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        fs.readFile('../js/jquery.min.js', null, function (error, css_data) {
            if (error) {
                response.writeHead(404);
                response.write('Whoops! File not found!');
            } else {
                response.write(css_data);
            }
            response.end();
        });
    }
    else if(request.url == '/bootstrap.min.js'){
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        fs.readFile('../js/bootstrap.min.js', null, function (error, css_data) {
            if (error) {
                response.writeHead(404);
                response.write('Whoops! File not found!');
            } else {
                response.write(css_data);
            }
            response.end();
        });
    }
    else if(request.url == '/main.js'){
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        fs.readFile('../js/main.js', null, function (error, css_data) {
            if (error) {
                response.writeHead(404);
                response.write('Whoops! File not found!');
            } else {
                response.write(css_data);
            }
            response.end();
        });
    }
    else if(request.url == '/elecronique.jpg'){
        response.writeHead(200, {'Content-Type': 'image/png'});
        fs.readFile('../images/elecronique.jpg', null, function (error, css_data) {
            if (error) {
                response.writeHead(404);
                response.write('Whoops! File not found!');
            } else {
                response.write(css_data);
            }
            response.end();
        });
    }
    else {
        response.writeHead(200, {'content-type': 'text/html'});
        response.write("<h1> incorrect page </h1>");  
        response.end();
    }
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    // var stripe = require("stripe")("sk_test_Y0R9YmutScJ3aN0iFJlEdnxC");

    // const charge = stripe.charges.create({
    //     amount: 999,
    //     currency: 'usd',
    //     source: 'tok_visa',
    //     receipt_email: 'jenny.rosen@example.com',
    // });

 }).listen(8081); 
 

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');