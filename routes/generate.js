var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var request = require('request');

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

    var final_playlist = [];
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
    */

    /*
        Steps:
        -Call API to get user's playlist, get one called "TuneActive Playlist" and grab its ID, if not there, create it and go right to adding
        -Call API to get that playlist and tracks, and store all track ids in an array
        -Call API to remove those tracks from that playlist
        -Call API to add new tracks
        -res.json back the playlist id to be placed in the embedded thing
     */

    // artificial final_playlist for testing
    final_playlist = ['spotify:track:2nMeu6UenVvwUktBCpLMK9', 'spotify:track:0mt02gJ425Xjm7c3jYkOBn', 'spotify:track:487OPlneJNni3NWC8SYqhW'];

    console.log('Starting calls');

    var final_playlist_JSON_form = {'uris' : []};
    var final_playlist_query_form = 'uris=';
    console.log(final_playlist_JSON_form);

    for (var i = 0; i < final_playlist.length; i++) {
        final_playlist_JSON_form['uris'] += final_playlist[i] + ',';
        final_playlist_query_form += final_playlist[i] + ',';
    }

    // get rid of trailing comma
    final_playlist_query_form = final_playlist_query_form.slice(0, -1);
    final_playlist_JSON_form['uris'] = final_playlist_JSON_form['uris'].slice(0,-1);
    console.log(final_playlist_query_form);

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

            // remove all songs first

            var getPlayOptions = { method: 'GET',
                url: 'https://api.spotify.com/v1/playlists/' + targetID,
                headers:
                    { 'Postman-Token': 'f7db762e-133d-4273-88fb-e9d71fb5bb9b',
                        'cache-control': 'no-cache',
                        Authorization: 'Bearer ' + req.session.access_token } };

            request(getPlayOptions, function (error, response, body) {
                if (error) throw new Error(error);

                // first get all the current songs in TuneActive Playlist
                var listOfSongs = body.tracks.items;
                var songsToRemove = [];

                for (var i = 0; i < listOfSongs.length; i++) {
                    var idOfSong = listOfSongs[i].track.uri;
                    songsToRemove.push(idOfSong);
                }

                if (songsToRemove.length === 0) {
                    // add all tracks from final_playlist

                    var addOptions = { method: 'POST',
                        url: 'https://api.spotify.com/v1/playlists/' + targetID + '/tracks',
                        headers:
                            { 'Postman-Token': '5ccf2a8f-d6c9-487d-b0de-96aeef897a73',
                                'cache-control': 'no-cache',
                                'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + req.session.access_token,},
                        body: final_playlist_JSON_form,
                        json: true };

                    request(addOptions, function (error, response, body) {
                        if (error) throw new Error(error);

                        // everything added, send back the playlist ID to be shown in an embedded spotify element
                        res.json({playlistID: targetID});

                    });
                } else {
                    // remove, then add

                    // build remove object
                    var toRemove = {tracks : []}

                    for (var i = 0; i < songsToRemove.length; i++) {
                        toRemove['tracks'].append({'uri': songsToRemove[i]});
                    }

                    // delete all tracks in TuneActive Playlist
                    var removeOptions = { method: 'DELETE',
                        url: 'https://api.spotify.com/v1/playlists/' + targetID + '/tracks',
                        qs: toRemove,
                        headers:
                            { 'Postman-Token': 'c8b099ec-5f18-4a0e-a78c-8d29f268cc90',
                                'cache-control': 'no-cache',
                                Authorization: 'Bearer ' + req.session.access_token } };

                    request(removeOptions, function (error, response, body) {
                        if (error) throw new Error(error);

                        var addOptions = { method: 'POST',
                            url: 'https://api.spotify.com/v1/playlists/' + targetID + '/tracks',
                            headers:
                                { 'Postman-Token': '5ccf2a8f-d6c9-487d-b0de-96aeef897a73',
                                    'cache-control': 'no-cache',
                                    'Content-Type': 'application/json',
                                    Authorization: 'Bearer ' + req.session.access_token,},
                            body: final_playlist_JSON_form,
                            json: true };

                        request(addOptions, function (error, response, body) {
                            if (error) throw new Error(error);

                            // everything added, send back the playlist ID to be shown in an embedded spotify element
                            res.json({playlistID: targetID});

                        });
                    });

                }

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
                    'Authorization': 'Bearer ' + req.session.access_token
                },
                "content-Type": 'application/json'
            };

            request(newPlayOptions, function (error,response,body) {
                console.log('Successfully created new playlist');
                var newBody = JSON.parse(body);
                var playlistID = newBody.id;
                console.log('PlaylistID is: ' + playlistID);
                console.log('Type of query:' + (typeof final_playlist_query_form));
                var addOptions = { method: 'POST',
                    url: 'https://api.spotify.com/v1/playlists/' + playlistID + '/tracks',
                    qs: final_playlist_JSON_form,
                    headers:
                        { 'Postman-Token': '5ccf2a8f-d6c9-487d-b0de-96aeef897a73',
                            'cache-control': 'no-cache',
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + req.session.access_token,}
                    //body: final_playlist_JSON_form,
                    /*json: true*/ };

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