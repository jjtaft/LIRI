var twitter = require("twitter");
var keys = require('./keys.js');

var spotify = require("spotify");

var request = require("request");

var fs = require("fs");

console.log("Enter one of the following commands to begin;");
console.log("my-tweets");
console.log("spotify-this-song <plus a song title of your choosing>");
console.log("movie-this <plus a movie title of your choosing>");
console.log("do-what-it-says");

var userCommand = process.argv[2];
var userInput = process.argv[3];


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
                var displayTweets = (tweets[i].created_at + '\n' + tweets[i].text + '\n');
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

    spotify.search({  type: 'track', query: songSearch },  function(err,  data)  {    
        if  ( err )  {        
            console.log('Error occurred: '  +  err);        
        } else {
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
        }
    });
};

function omdbSearch() {

    var movieTitle;
    if (userInput === undefined) {
        movieTitle = "Mr. Nobody";
    } else {
        movieTitle = userInput;
    };

    var url = 'http://www.omdbapi.com/?t=' + movieTitle + '&y=&plot=long&tomatoes=true&r=json';

    request(url, function(error, response, body) {
        if (error) {
            console.log("Error");
        } else {
            console.log("Title: " + JSON.parse(body)["Title"]);
            console.log("Year: " + JSON.parse(body)["Year"]);
            console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
            console.log("Country: " + JSON.parse(body)["Country"]);
            console.log("Language: " + JSON.parse(body)["Language"]);
            console.log("Plot: " + JSON.parse(body)["Plot"]);
            console.log("Actors: " + JSON.parse(body)["Actors"]);
            console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
        }
    });
};

function accessTextFile (){
	fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    } 
    else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }

  });
};
