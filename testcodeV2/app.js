var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session')
var logger = require('morgan');
var request = require('request'); // "Request" library
var cors = require('cors');
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var playlistRouter = require('./routes/playlist');
var tagsRouter = require('./routes/tags');
var aboutRouter = require('./routes/about');
var usersRouter = require('./routes/users');

var app = express();

var querystring = require('querystring');

var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret
var redirect_uri = 'http://localhost:' + process.env.PORT + '/callback'; // Your redirect uri
var stateKey = 'spotify_auth_state';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: ['hey'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/home', homeRouter);
app.use('/playlist', playlistRouter);
app.use('/tags', tagsRouter);
app.use('/about', aboutRouter);
app.use('/users', usersRouter);

app.post('/search', function(req, res, next) {
    console.log(req.body);
    var queryVal = req.body['queryVal'];
    var limitVal = req.body['limitVal'];

    // check limit input
    if (limitVal === undefined) {
        limitVal = '10';
    } else if (isNaN(Number(limitVal))  || Number(limitVal) < 1 || Number(limitVal) > 50) {
        limitVal = '10';
    }


    var options = { method: 'GET',
        url: 'https://api.spotify.com/v1/search',
        qs:
            { q: queryVal,
                type: 'track',
                limit: limitVal},
        headers:
            { 'Postman-Token': '2a74b03f-4fda-41d2-ac01-c5cc0c9a7630',
                'cache-control': 'no-cache',
                Authorization: 'Bearer  ' + req.session.access_token },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        var itemArray = body.tracks.items;
        var result = [];

        for (var i = 0; i < itemArray.length; i++) {
            result.push([itemArray[i].name, itemArray[i].artists[0].name, itemArray[i].id]);
        }

        console.log('\n\n')
        result.forEach(function(element) {
            console.log(element[1] + ' - ' + element[0] + ' with ID: ' + element[2]);
        });
        console.log('\n\n')

        console.log("Sending result back");
        res.json({ searchResults: result });
    });
});

app.post('/update', function(req, res) {
    var songsAdded = req.body['songIds[]'];
    var tag = req.body['tag'];

    if (typeof songsAdded == 'string'){
        songsAdded = [songsAdded];
    }

    console.log(songsAdded);
    console.log(tag);

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

    var username_insert = req.session.userId;
    for (var i=0; i<songsAdded.length; i++)
    {
        var min = 1;
        var max = 100000000;
        // generates a random number between min and max
        var id = Math.floor(Math.random() * (max - min)) + min;
        var song_insert = songsAdded[i];
        connection.query("insert into mainTable values ("+id+", '"+username_insert+"', '"+song_insert+"', '"+tag+"')",
            function(error, result, field) {
                // callback function after query is done
                if (!!error) {
                    console.log('Error with query 1');
                    console.log(error);
                }
                else {
                    console.log('Query Insert executed \n');
                }
            });
    }

    res.send('done');
});

/* GET home page. */
app.get('/login', function (req, res) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

app.get('/callback', function (req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };
        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;
                req.session.access_token = access_token;
                console.log(access_token) // I ADDED THIS
                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {'Authorization': 'Bearer ' + access_token},
                    json: true
                };
                // use the access token to access the Spotify Web API
                request.get(options, function (error, response, body) {
                    req.session.userId = body.id;
                    req.session.loc = body.country;
                    console.log('session userId:' + req.session.userId);
                    user = body.id;
                    console.log(body);
                    console.log(body.id);
                    console.log('RENDERING');
                    res.render('home', {username: req.session.userId, country: req.session.loc});
                    //res.render('home', {username: user});
                    //res.redirect('/home')
                });
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });

    }
});

app.get('/refresh_token', function (req, res) {

    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))},
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


module.exports = app;
