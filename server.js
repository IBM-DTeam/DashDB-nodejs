/*eslint-env node*/

//---------------------------------------------------------------------------------------
// nodejs. starter application for Bluemix
//---------------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// get the app environment from Cloud foundry
var appEnv = cfenv.getAppEnv();

// Include the ibm_db module
var ibmdb = require('ibm_db');

global.dbConnString = "DATABASE=YOUR_DATABASE_NAME;"
    + "HOSTNAME=YOUR_HOSTNAME;PORT=50000;PROTOCOL=TCPIP;"
    + "UID=USERNAME;PWD=PASSWORD";

// start server on the specified port and binding host
app.listen(appEnv.port, function() {
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);

    ibmdb.open(dbConnString, function(err, conn) {
        if (err) {
            console.log("Error", err);
        } else {
            var query = "SELECT * FROM TEST";
            conn.query(query, function(err, rows) {
                if (err) {
                    console.log("Error", err);
                    return;
                } else {
                    console.log(rows);
                    conn.close(function() {
                        console.log("Connection closed successfully");
                    });
                }
            });
        }
    })
});
