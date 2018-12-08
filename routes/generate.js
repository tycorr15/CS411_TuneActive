var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var request = require('request');

/* Generate button functionality. */
router.post('/', function(req, res, next) {
    console.log(req.body);

    var sliderSelections = [];
    var selectCount = Object.keys(req.body).length;

    // Need to rebuild the JSON object into a list for some odd reason
    for (var i = 0; i < selectCount; i++) {
        sliderSelections.push(req.body['sliderVals[' + i + '][]']);
    }

    console.log(sliderSelections);

    var final_playlist = [];

    /*
        Rebecca code to edit final_playlist
    */


    /*
        Steps:
        -Call API to get user's playlist, get one called "TuneActivePlaylist" and grab its ID, if not there, create it and go right to adding
        -Call API to get that playlist and tracks, and store all track ids in an array
        -Call API to remove those tracks from that playlist
        -Call API to add new tracks
        -res.json back the playlist id to be placed in the embedded thing
     */
    var options = {
        url: "https://api.spotify.com/v1/users/"+req.session.userId+"/playlists",
        body: JSON.stringify({
            'name': "TuneActive Playlist",
            'public': false
        }),
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer ' + req.session.access_token
        },
        "content-Type": 'application/json'
    };

    request.post(options,(error,response,body) => {
        var newBody = JSON.parse(body);
        var playlistID = newBody.id;

        // Now add all the songs from final_playlist
        for (var i = 0; i < final_playlist.length; i++) {

        }
    });

    // last step, send playlist URL
    res.json( {playlistSongs: sliderSelections});
});

module.exports = router;