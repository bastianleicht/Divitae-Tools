
// jshint esversion: 8

var responseUtils = require('../../../helpers/response_utilities.js');

module.exports = (app, passport, database) => {
    
    app.post('/api/mapAccounts', (req, res) => {
        
        //Post variables
        var username = req.body.username;
        var password = req.body.password;

        //Query the database
        //Preform action on database
        //Insert USERNAME and PASSWORD into database if it doesn't exist.
        //If it does exist, update username and UUID.
        
        database.query("REPLACE INTO usermap(username, password) VALUES('" + username + "', '" + password + "')", function (err, result, fields) {

            if (err) {
                responseUtils.error("500 Error. See console.");
                console.log(err);
                return;
            }
            
            responseUtils.success(res, "200 OK");

        });
    });
    
};