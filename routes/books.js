var express = require('express');
var router = express.Router();
var Joi = require('joi');
var request = require("request");

var jsonServer = 'http://localhost:3001';

router.get('/api/books', function (req, res) {
    request({
        url: jsonServer+'/books',
        json: true
    }, function (error, response, body) {
        return res.status(response.statusCode).json(body);

    })
});

router.get('/api/books/:_id', function (req, res) {
    request({
        url: jsonServer+'/books/'+req.params._id,
        json: true
    }, function (error, response, body) {
        return res.status(response.statusCode).json(body);
    })
});

router.post('/api/books', function (req, res) {
    var book = req.body;
    const schema = {
        title: Joi.string().min(3).required(),
        genres: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
        author: Joi.string().min(3).required()
    };

    const result = Joi.validate(book, schema);
    if(result.error){
        return res.status(400).json(result.error.details[0].message);

    }

    request.post({url:jsonServer+'/books', form: book}, function(err,httpResponse,body){
        res.status(201).json(book);
    })
});


module.exports = router;