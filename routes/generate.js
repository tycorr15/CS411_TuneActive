var express = require('express');
var router = express.Router();
var mysql = require('mysql');

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

    //mysql code
    var connection = mysql.createConnection( {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'TuneActiveDB'
    });

    connection.connect(function(error) {
        if (!!error) {
            console.log('Error');
        }
        else {
            console.log('Connected');
        }

    });

    // where all the songs will be stored in
    var final_playlist = [];


    // getting low intensity songs
    if (input_low_duration != 0) {
        var all_songs = [];
        var all_dur = [];


        var total_low_duration;
        connection.query("select sum(duration) from mainTable where username = "+username_insert+" and tag = 'Low Intensity')",
            function(error, result, field) {
                // callback function after query is done
                if (!!error) {
                    console.log('Error with query select low');
                    console.log(error);
                }
                else {
                    console.log('Query select low executed \n');
                    console.log(result);
                    total_low_duration = result;
                }
            });



        connection.query("select songname from mainTable where username = "+username_insert+" and tag = 'Low Intensity')",
            function(error, result, field) {
                // callback function after query is done
                if (!!error) {
                    console.log('Error with query select low');
                    console.log(error);
                }
                else {
                    console.log('Query select low executed \n');
                    for (var i=0; i<result.length; i++) {
                        all_songs[i] = result[i];
                    }
                }
            });


        connection.query("select duration from mainTable where username = "+username_insert+" and tag = 'Low Intensity')",
            function(error, result, field) {
                // callback function after query is done
                if (!!error) {
                    console.log('Error with query select low');
                    console.log(error);
                }
                else {
                    console.log('Query select low executed \n');
                    for (var i=0; i<result.length; i++) {
                        all_dur[i] = result[i];
                    }
                }
            });



        if ((total_low_duration > 0) & (total_low_duration <= input_low_duration)) {
            // add all songs from select query into list
            for (var i=0; i<all_songs.length; i++) {
                final_playlist.push(all_songs[i]);
            }

        }

        if ((total_low_duration > 0) & (total_low_duration > input_low_duration)) {
            // add songs until reach input_low_duration
            var cur_dur = 0;
            while (cur_dur < input_low_duration) {
                for (var i=0; i<all_songs.length; i++) {
                    final_playlist.push(all_songs[i]);
                    cur_dur = cur_dur + all_dur[i];
                }
            }
            // if playlist is a bit longer than needed?
            var dif_dur = cur_dur - input_low_duration;

        }
    }


    // getting medium intensity songs
    if (input_medium_duration != 0) {

        var all_songs = [];
        var all_dur = [];


        var total_medium_duration;
        connection.query("select sum(duration) from mainTable where username = "+username_insert+" and tag = 'Medium Intensity')",
            function(error, result, field) {
                // callback function after query is done
                if (!!error) {
                    console.log('Error with query select low');
                    console.log(error);
                }
                else {
                    console.log('Query select low executed \n');
                    console.log(result);
                    total_medium_duration = result;
                }
            });



        connection.query("select songname from mainTable where username = "+username_insert+" and tag = 'Medium Intensity')",
            function(error, result, field) {
                // callback function after query is done
                if (!!error) {
                    console.log('Error with query select low');
                    console.log(error);
                }
                else {
                    console.log('Query select low executed \n');
                    for (var i=0; i<result.length; i++) {
                        all_songs[i] = result[i];
                    }
                }
            });


        connection.query("select duration from mainTable where username = "+username_insert+" and tag = 'Medium Intensity')",
            function(error, result, field) {
                // callback function after query is done
                if (!!error) {
                    console.log('Error with query select low');
                    console.log(error);
                }
                else {
                    console.log('Query select low executed \n');
                    for (var i=0; i<result.length; i++) {
                        all_dur[i] = result[i];
                    }
                }
            });



        if ((total_medium_duration > 0) & (total_medium_duration <= input_medium_duration)) {
            // add all songs from select query into list
            for (var i=0; i<all_songs.length; i++) {
                final_playlist.push(all_songs[i]);
            }

        }

        if ((total_medium_duration > 0) & (total_medium_duration > input_medium_duration)) {
            // add songs until reach input_low_duration
            var cur_dur = 0;
            while (cur_dur < input_low_duration) {
                for (var i=0; i<all_songs.length; i++) {
                    final_playlist.push(all_songs[i]);
                    cur_dur = cur_dur + all_dur[i];
                }
            }
            // if playlist is a bit longer than needed?
            var dif_dur = cur_dur - input_medium_duration;

        }
    }


    // getting high intensity songs
    if (input_high_duration != 0) {

        var all_songs = [];
        var all_dur = [];


        var total_high_duration;
        connection.query("select sum(duration) from mainTable where username = "+username_insert+" and tag = 'High Intensity')",
            function(error, result, field) {
                // callback function after query is done
                if (!!error) {
                    console.log('Error with query select high');
                    console.log(error);
                }
                else {
                    console.log('Query select high executed \n');
                    console.log(result);
                    total_high_duration = result;
                }
            });



        connection.query("select songname from mainTable where username = "+username_insert+" and tag = 'High Intensity')",
            function(error, result, field) {
                // callback function after query is done
                if (!!error) {
                    console.log('Error with query select high');
                    console.log(error);
                }
                else {
                    console.log('Query select high executed \n');
                    for (var i=0; i<result.length; i++) {
                        all_songs[i] = result[i];
                    }
                }
            });


        connection.query("select duration from mainTable where username = "+username_insert+" and tag = 'High Intensity')",
            function(error, result, field) {
                // callback function after query is done
                if (!!error) {
                    console.log('Error with query select low');
                    console.log(error);
                }
                else {
                    console.log('Query select low executed \n');
                    for (var i=0; i<result.length; i++) {
                        all_dur[i] = result[i];
                    }
                }
            });



        if ((total_high_duration > 0) & (total_high_duration <= input_high_duration)) {
            // add all songs from select query into list
            for (var i=0; i<all_songs.length; i++) {
                final_playlist.push(all_songs[i]);
            }

        }

        if ((total_medium_duration > 0) & (total_medium_duration > input_medium_duration)) {
            // add songs until reach input_low_duration
            var cur_dur = 0;
            while (cur_dur < input_low_duration) {
                for (var i=0; i<all_songs.length; i++) {
                    final_playlist.push(all_songs[i]);
                    cur_dur = cur_dur + all_dur[i];
                }
            }
            // if playlist is a bit longer than needed?
            var dif_dur = cur_dur - input_medium_duration;

        }
    }


    // last step
    res.json( {playlistSongs: sliderSelections});
});

module.exports = router;