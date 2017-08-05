"use strict"
/* use this file to retrieve questions for the flash card
 * requires the request and inquirer packages
 */

var rqt = require('request');   //request
var ask = require('inquirer');  //inquire (to make the app dope)

var bsc = require('./BasicCard');
var clz = require('./ClozeCard');

ask.prompt([
    {

        type: "list",
        name: "game",
        choices: ["Basic", "Cloze"],
        message: "Which kind of flashcard game do you want to play?"

    }]).then(function(ans){

        console.log(ans);
        var input = ans.game;

        switch(input){

            case "Basic":
                console.log("You've chosen to play the basic flashcard game:")

                // console.log(card.front)
                var trivia = 'https://opentdb.com/api.php?amount=1&category=9&type=multiple'


                // rqt('http://www.google.com', function (error, response, body) {
                rqt(trivia, function(error, response, body) {
                    var card = new bsc()
                    var obj = JSON.parse(body)
                    
                    // console.log("body: " + body);
                    // console.log(response);
                    
                    // console.log('error:', error);                                // Print the error if one occurred 
                    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
                    // console.log('body:', body)                                   // Print the HTML for the Google homepage. 
                    // console.log('body:', obj.results)                            // Print the HTML for the Google homepage.
                    // console.log('body:', obj.results[0].question)                // Print the HTML for the Google homepage.

                    card.front = obj.results[0].question;
                    console.log(card.front);
                })

                break;
            
            case "Cloze":
                console.log("You've chosen to play the cloze flashcard game.")
                var card = new clz()
                break;
            
            default:
                console.log("This is not a game option");
        }

    });