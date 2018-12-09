var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var request = require('request');

/* Generate button functionality. */
router.post('/', function(req, res, next) {

    var input_playlist = [];
    var selectCount = Object.keys(req.body).length;

    // Need to rebuild the JSON object into a list for some odd reason
    for (var i = 0; i < selectCount; i++) {
        input_playlist.push(req.body['sliderVals[' + i + '][]']);
    }

    console.log(input_playlist);

    /*
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
                            for (var i=0; i<all_songs.length; i++)
                            {
                                if (cur_dur < input_duration)
                                {
                                    final_playlist.push(all_songs[i]);
                                    cur_dur = cur_dur + all_dur[i];
                                }
                            }
                        }

                    }
                    console.log(final_playlist);
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
                            for (var i=0; i<all_songs.length; i++)
                            {
                                if (cur_dur < input_duration)
                                {
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
                            for (var i=0; i<all_songs.length; i++)
                            {
                                if (cur_dur < input_duration) {
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
    */

    // artificial final_playlist for testing
    var final_playlist = ['spotify:track:2nMeu6UenVvwUktBCpLMK9', 'spotify:track:0mt02gJ425Xjm7c3jYkOBn', 'spotify:track:487OPlneJNni3NWC8SYqhW'];

    console.log('Starting calls');

    var final_playlist_JSON_form = {'uris' : final_playlist};
    var final_playlist_query_form = 'uris=';

    for (var i = 0; i < final_playlist.length; i++) {
        final_playlist_query_form += final_playlist[i] + ',';
    }

    // get rid of trailing comma
    final_playlist_query_form = final_playlist_query_form.slice(0, -1);

    console.log('Playlist in JSON form done');
    console.log(final_playlist_JSON_form);

    var playlistOptions = { method: 'GET',
        url: 'https://api.spotify.com/v1/me/playlists',
        headers:
            { 'Postman-Token': '43903693-d2df-4544-a1c6-5527210828f3',
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + req.session.access_token },
        json: true};

    request(playlistOptions, function (error, response, body) {
        if (error) throw new Error(error);

        console.log('Successfully got playlists of user');

        var playlistArray = body.items;
        var flag = false;
        var targetIndex = 0;

        // check if user already has the TuneActive Playlist
        for (var i = 0; i < playlistArray.length; i++) {
            if (playlistArray[i].name === 'TuneActive Playlist') {
                flag = true;
                targetIndex = i;
                break;
            }
        }

        if (flag) {
            var targetID = playlistArray[targetIndex].id;
            console.log('Playlist already exists with ID: ' + targetID);

            var replaceOptions = { method: 'PUT',
                url: 'https://api.spotify.com/v1/playlists/' + targetID + '/tracks',
                //qs: final_playlist_JSON_form,
                headers:
                    { 'Postman-Token': '5ccf2a8f-d6c9-487d-b0de-96aeef897a73',
                        'cache-control': 'no-cache',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + req.session.access_token},
                body: final_playlist_JSON_form,
                json: true};

            request(replaceOptions, function (error, response, body) {
                if (error) throw new Error(error);
                console.log('Successfully replaced songs in playlist');

                // everything added, send back the playlist ID to be shown in an embedded spotify element
                res.json({playlistID: targetID});

            });

        } else {
            // playlist doesn't exist yet, create it
            console.log("Playlist doesn't exist.");

            var newPlayOptions = { method: 'POST',
                url: "https://api.spotify.com/v1/users/"+req.session.userId+"/playlists",
                body: JSON.stringify({
                    'name': "TuneActive Playlist",
                    'public': false
                }),
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + req.session.access_token
                }
            };


            request(newPlayOptions, function (error,response,body) {
                console.log('Successfully created new playlist');
                var newBody = JSON.parse(body);
                var playlistID = newBody.id;

                var addOptions = { method: 'POST',
                    url: 'https://api.spotify.com/v1/playlists/' + playlistID + '/tracks',
                    //qs: final_playlist_JSON_form,
                    headers:
                        { 'Postman-Token': '5ccf2a8f-d6c9-487d-b0de-96aeef897a73',
                            'cache-control': 'no-cache',
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + req.session.access_token},
                    body: final_playlist_JSON_form,
                    json: true};

                request(addOptions, function (error, response, body) {
                    if (error) throw new Error(error);
                    console.log('Successfully added songs to playlist');
                    console.log(body);

                    // everything added, send back the playlist ID to be shown in an embedded spotify element
                    res.json({playlistID: targetID});

                });

            });
        }

    });

});

module.exports = router;