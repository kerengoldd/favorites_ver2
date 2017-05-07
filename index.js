'use strict';
const express = require('express'),
    app = express(),
    favoritFunction = require('./favorites_modules/index'),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    newF = new favoritFunction();

app.use('/assets',express.static(`${__dirname}/public`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));

app.get('/getAllFavorites',(req,res) => {
    res.status(200).json(newF.getAllFavorites());
});

app.post('/getFavoritesOfUser',(req ,res) => {
        res.status(200).json(newF.getFavoritesOfUser(req.body.user));
});

app.post('/getFavoritesOfMonthByCategory',(req,res) =>{
    res.json(newF.getFavoritesOfMonthByCategory(req.body.month, req.body.category));
});

app.all('*',(req,res) =>{
    res.send(`
        <!doctype html>
        <html>
        <head>
        <title>Wrong URL</title>
        <link href=assets/style.css rel=stylesheet>
        </head>
        <body>
        <h1>Your URL Wrong</h1>
        <img src="assets/keren.jpg">
        </body>
        </html>`);
})

app.listen(port);
console.log('server is on');
console.log(`listening on port' ${port}`);
