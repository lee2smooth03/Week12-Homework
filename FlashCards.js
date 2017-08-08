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

        // console.log(ans);
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

                    card.front  = obj.results[0].question;
                    card.back   = obj.results[0].correct_answer;
                    var wrong   = obj.results[0].incorrect_answers;

                    // console.log(" ");
                    // console.log(wrong, card.back);

                    ask.prompt([
                        {
                            type: "list",
                            name: "guess",
                            choices: scrambler(wrong, card.back),
                            // choices: ["1", "2", "3"],
                            message: card.front
                        }]).then(function(ans){
                            // console.log(ans);
                            // console.log(ans.guess);

                            if (ans.guess === card.back){
                                console.log("Yay, you got it right!");
                            }
                            else{
                                console.log("Sorry, the correct answer is: " + card.back);
                            }
                        });

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

function scrambler(arr, ins){
    var scram   = [];
    var numb    = Math.floor(Math.random() * (arr.length + 1));
    /** 
     * scrambles arrays then exits */
    console.log(" ");
    // console.log(numb);

        for (var i = 0; i < (arr.length + 1); ++i){
            
            if (i < numb){
                scram[i] = arr[i];
            }
            else if (i === numb){
                scram[i] = ins;
            }
            else{

                scram[i] = arr[i - 1];

                // for (var j = i - 1; j < (arr.length + 1); ++j){
                //     // scram[j + 1] = arr[j];
                //     console.log("index: " + j);
                // }
                // return ("exited j-loop at i: " + i);

            }
        }

    // console.log(scram);
    return scram;
}