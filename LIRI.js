var keys = require('./keys.js');
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require('fs');

console.log("Enter one of the following commands to begin;");
console.log("my-tweets");
console.log("spotify-this-song <plus a song title of your choosing>")
console.log("movie-this <plus a movie title of your choosing>")
console.log("do-what-it-says")

var userCommand = process.argv[2];
var userInput = process.argv[3];

function commandSwitch() {

    switch (userCommand) {

        case 'my-tweets':
            retrieveTweets();
            break;

        case 'spotify-this-song':
            searchSpotify();
            break;

        case 'movie-this':
            omdbSearch();
            break;

        case 'do-what-it-says':
            accessTextFile();
            break;
    }
};


function retrieveTweets() {


    var client = new twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });

    var params = {
        screen_name: 'jjtaft',
        count: 20
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
        	console.log('Error');
        } else {
            for (i = 0; i < tweets.length; i++) {
                var displayTweets = ('Tweet #: ' + (i + 1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
                console.log(displayTweets);
            }
        };
    });
};

function searchSpotify() {

    var songSearch;

    if (userInput === undefined) {
        songSearch = "The Sign"
    } else {
        songSearch = userInput;
    } 

    spotify.search({  type:   'track',  query: songSearch },  function(err,  data)  {    
        if  ( err )  {         console.log('Error occurred: '  +  err);        
            return;		} else {
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);

        }

    });
};
