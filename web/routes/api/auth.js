
// jshint esversion: 8

var responseUtils = require('../../.././helpers/response_utilities.js');
const bcrypt = require('bcrypt');

module.exports = (app, passport, database) => {

  app.post('/api/auth', async (req, res) => {

    //Post variables
    var username = req.body.username;
    var password = req.body.password;

    //Query the database
    //Preform action on database
    //Insert HWID, UUID, and USERNAME into database if it doesn't exist.
    //If it does exist, update username and UUID.

    database.query("SELECT password FROM `users` WHERE username = '" + username + "'", function (err, result, fields) {

      const user = { name: result.username, password: result.password };
      var toReturn = result[0];

      if (err) {
        responseUtils.error("500 Error!");
        console.log(err);
        return;
      }
      if (result == null) {
        responseUtils.notFound(res, "400 Cannot find User!");
      }
      try {
         if(bcrypt.compare(password, result[0])) {
           console.log("##################");
           console.log(toReturn);
           console.log("##################");
           consile.log(fields);
          responseUtils.success(res, "200 OK");
        } else {
          responseUtils.notFound(res, "400 Cannot find User!");
        }
      } catch {
        responseUtils.notFound(res, "400 Cannot find User!");
      }
    });
  });

};