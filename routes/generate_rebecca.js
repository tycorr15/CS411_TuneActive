var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* Generate button functionality. */
router.post('/', function(req, res, next) {
    console.log(req.body);

    var input_playlist = [];
    var selectCount = Object.keys(req.body).length;

    // Need to rebuild the JSON object into a list for some odd reason
    for (var i = 0; i < selectCount; i++) {
        input_playlist.push(req.body['sliderVals[' + i + '][]']);
    }

    console.log(input_playlist);

    
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
    var user = req.session.userId;

    for (var i = 0; i < input_playlist.length; i++)
    {
        var input_intensity = input_playlist[i][0];
        var input_duration = Number(input_playlist[i][1]) * 60000;

        console.log(input_intensity);
        console.log(input_duration);


        // getting low intensity songs
        if ((input_intensity == "Low Intensity") && (input_duration != 0))
        {

            var all_songs = [];
            var all_dur = [];
            var total_low_duration = 0;


            connection.query("select songname from mainTable where username = '"+user+"' and tag = 'Low Intensity'",
                function(error, result, field) {
                    // callback function after query is done
                    if (!!error) {
                        console.log('Error with query select low 1');
                        console.log(error);
                    }
                    else {
                        console.log('Query select low 1 executed \n');
                        for (var i=0; i<result.length; i++) {
                            all_songs[i] = result[i].songname;
                            console.log(all_songs[i]);
                        }
                    }
            })




            connection.query("select duration from mainTable where username = '"+user+"' and tag = 'Low Intensity'",
                function(error, result, field) {
                    // callback function after query is done
                    if (!!error) {
                        console.log('Error with query select low 2');
                        console.log(error);
                    }
                    else
                    {
                        console.log('Query select low 2 executed \n');
                        for (var i=0; i<result.length; i++)
                        {
                            all_dur[i] = Number(result[i].duration);
                            total_low_duration = total_low_duration + all_dur[i];
                        }

                        if ((total_low_duration > 0) && (total_low_duration <= input_duration))
                        {
                            // add all songs from select query into list
                            for (var i=0; i<all_songs.length; i++) {
                                final_playlist.push(all_songs[i]);
                            }

                        }

                        if ((total_low_duration > 0) && (total_low_duration > input_duration))
                        {
                            // add songs until reach input_low_duration
                            var cur_dur = 0;
                            while (cur_dur < input_duration)
                            {
                                for (var i=0; i<all_songs.length; i++) {
                                    final_playlist.push(all_songs[i]);
                                    cur_dur = cur_dur + all_dur[i];
                                }
                            }
                        }
                        console.log(final_playlist);

                    }
            })

        }



        // getting medium intensity songs
        if ((input_intensity == "Medium Intensity") && (input_duration != 0))
        {

            var all_songs = [];
            var all_dur = [];
            var total_medium_duration = 0;


            connection.query("select songname from mainTable where username = '"+user+"' and tag = 'Medium Intensity'",
                function(error, result, field) {
                    // callback function after query is done
                    if (!!error) {
                        console.log('Error with query select medium 1');
                        console.log(error);
                    }
                    else {
                        console.log('Query select medium 1 executed \n');
                        for (var i=0; i<result.length; i++) {
                            all_songs[i] = result[i].songname;
                            console.log(all_songs[i]);
                        }
                    }
            })




            connection.query("select duration from mainTable where username = '"+user+"' and tag = 'Medium Intensity'",
                function(error, result, field) {
                    // callback function after query is done
                    if (!!error) {
                        console.log('Error with query select medium 2');
                        console.log(error);
                    }
                    else
                    {
                        console.log('Query select medium 2 executed \n');
                        for (var i=0; i<result.length; i++)
                        {
                            all_dur[i] = Number(result[i].duration);
                            total_medium_duration = total_medium_duration + all_dur[i];
                        }

                        if ((total_medium_duration > 0) && (total_medium_duration <= input_duration))
                        {
                            // add all songs from select query into list
                            for (var i=0; i<all_songs.length; i++) {
                                final_playlist.push(all_songs[i]);
                            }

                        }

                        if ((total_medium_duration > 0) && (total_medium_duration > input_duration))
                        {
                            // add songs until reach input_low_duration
                            var cur_dur = 0;
                            while (cur_dur < input_duration)
                            {
                                for (var i=0; i<all_songs.length; i++) {
                                    final_playlist.push(all_songs[i]);
                                    cur_dur = cur_dur + all_dur[i];
                                }
                            }
                        }
                        console.log(final_playlist);

                    }
            })

        }



        // getting high intensity songs
        if ((input_intensity == "High Intensity") && (input_duration != 0))
        {

            var all_songs = [];
            var all_dur = [];
            var total_high_duration = 0;


            connection.query("select songname from mainTable where username = '"+user+"' and tag = 'High Intensity'",
                function(error, result, field) {
                    // callback function after query is done
                    if (!!error) {
                        console.log('Error with query select high 1');
                        console.log(error);
                    }
                    else {
                        console.log('Query select high 1 executed \n');
                        for (var i=0; i<result.length; i++) {
                            all_songs[i] = result[i].songname;
                            console.log(all_songs[i]);
                        }
                    }
            })




            connection.query("select duration from mainTable where username = '"+user+"' and tag = 'High Intensity'",
                function(error, result, field) {
                    // callback function after query is done
                    if (!!error) {
                        console.log('Error with query select high 2');
                        console.log(error);
                    }
                    else
                    {
                        console.log('Query select high 2 executed \n');
                        for (var i=0; i<result.length; i++)
                        {
                            all_dur[i] = Number(result[i].duration);
                            total_high_duration = total_high_duration + all_dur[i];
                        }

                        if ((total_high_duration > 0) && (total_high_duration <= input_duration))
                        {
                            // add all songs from select query into list
                            for (var i=0; i<all_songs.length; i++) {
                                final_playlist.push(all_songs[i]);
                            }

                        }

                        if ((total_high_duration > 0) && (total_high_duration > input_duration))
                        {
                            // add songs until reach input_low_duration
                            var cur_dur = 0;
                            while (cur_dur < input_duration)
                            {
                                for (var i=0; i<all_songs.length; i++) {
                                    final_playlist.push(all_songs[i]);
                                    cur_dur = cur_dur + all_dur[i];
                                }
                            }
                        }
                        console.log(final_playlist);

                    }
            })

        }
    }

    // last step
    res.json( {playlistSongs: sliderSelections});
});

module.exports = router;