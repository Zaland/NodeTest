const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const http = require('http').Server(app);
const port = 3000;
const json_file = __dirname + '/content.json';
const html_file = __dirname + '/static/index.html';

// set up static folder and body parser
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// send the initial index.html file
app.get('/', function (req, res) {
    res.sendFile(html_file);
});

// check JSON data and make sure that all data is not empty
app.route('/json').get((req, res) => {
    fs.readFile(json_file, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let parsed_data = JSON.parse(data);
            for (let i = 0; i < parsed_data.content.length; i++)
                if (parsed_data.content[i].data === undefined &&
                    parsed_data.content[i].type === undefined &&
                    parsed_data.content[i].display === undefined)
                    parsed_data.content.splice(i, 1);

            res.json(parsed_data);
        }
    });
});

// read the current JSON data file and add the received JSON object to it
// then stringify it, and rewrite it back into the file
app.route('/saveJSON').post((req, res) => {
    fs.readFile(json_file, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let parsed_data = JSON.parse(data);
            parsed_data.content.push(req.body);
            fs.writeFile(json_file, JSON.stringify(parsed_data), 'utf8', function(err) {
                if (err)
                    console.log(err);
                else
                    res.send(true);
            });
        }
    });
});

http.listen(port, function () {
    console.log('listening on: ' + port);
});

