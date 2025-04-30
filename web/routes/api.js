
// jshint esversion: 8

var fs = require('fs');
var responseUtils = require('../helpers/response_utilities.js');

module.exports = (app, passport, database) => {


    app.get('/api', (req, res) => {
        //respond with 200 OK and the text "200 OK"
        responseUtils.success(res, '200 OK');
    });

};
