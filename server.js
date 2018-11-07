// Basic Express Server
const express = require('express');
// Handlebars View Engine for Express
const hbs = require('hbs');
const fs = require('fs');

let app = express();


// Allow Partials
hbs.registerPartials(__dirname + '/views/partials');
// Start using Handlebars as view Engine
app.set('View Engine', 'hbs');

// Middleware

app.use((req, res, next) => {
    let now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'This is the home page for this application.'
    });
});

app.get('/api', (req, res) => {
    //res.send('<h1>Welcome to SportsUniverse!!</h1>');
    res.send({
        city: 'Sacramento',
        team: 'Kings',
        starters: [
            'DeAaron Fox',
            'Buddy Hield',
            'Harry Giles',
            'Marvin Bagley III',
            'Willie Cauley-Stein'
        ]
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'You know you done messed up dontcha'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});

// Heroku Deployment- change app.listen to;
// See env variables by running "env" on Linux or OSX and "SET" on Windows
// key/value pairs 
// set port variable 
// Set this variable to use with Heroku (set at top with other const)
// const port = process.env.PORT || 3000;

// Replace app.listen with this code.
// app.listen(port, () => {
//     console.log('Server is up on ${port}');
// });

// Set test script in package.json under scripts
// "start": "node server.js"