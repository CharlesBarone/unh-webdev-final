const http = require('http');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000

const uri = "mongodb+srv://mongo:BBRvG2Z3dXj7ZXWF@cluster0.q3wyw24.mongodb.net/web_dev_final?retryWrites=true&w=majority";

mongoose.set('strictQuery', false);

try {
    mongoose.connect(uri);
} catch(e) {
    console.log("Mongo Error: " + e);
}

const carSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: String,
    miles: String,
    mpg: String,
    price: String,
    color: String,
    description: String,
    availability: Boolean
});

const Car = mongoose.model('cars', carSchema);

http.createServer((req, res) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');

    switch(req.url) {
        case "/":
        case "/index.html":
            fs.readFile(path.join(__dirname, 'public_html', 'index.html'), (err, content) => {           
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            });
            break;
        case "/style.css":
            fs.readFile(path.join(__dirname, 'public_html', 'style.css'), (err, content) => {           
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(content);
            });
            break;
        case "/profile.jpeg":
            fs.readFile(path.join(__dirname, 'public_html', 'profile.jpeg'), (err, content) => {           
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(content);
            });
            break;
        case "/api":
            res.writeHead(200, { 'Content-Type': 'application/json' });
            
            Car.find({}, {}, function (err, documents) {
                if (err) throw err;
                var response = [];
                documents.forEach(function(document) {
                    response.push(document);
                })
                res.end(JSON.stringify(response));
            });
            
            break;
        default:
            res.write("<h1>Error 404</h1></br><p>The page you requested was not found</p>");
            res.end();
            break;
    }
}).listen(port, ()=> console.log("500 Okay"));