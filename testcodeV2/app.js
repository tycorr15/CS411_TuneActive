var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session')
var logger = require('morgan');
var request = require('request'); // "Request" library
var cors = require('cors');

var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var playlistRouter = require('./routes/playlist');
var tagsRouter = require('./routes/tags');
var aboutRouter = require('./routes/about');
//var loginRouter = require('./routes/login');
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
//app.use('/login', loginRouter);
//app.use('/callback', loginRouter);
app.use('/users', usersRouter);


/* FOR TEAM TO READ!!!!!!!!!

    Okay, I am going to explain what is going on.

    -In the views folder, index.pug represents the login page. Notice the button has an href=/login
    -This will hit the app.get('/login'...) route below. This calls the spotify url to authorize a user,
    and then it hits the callback URL which is localhost:7542/callback
    -When this happens, it hits the callback route below. A lot of this code I am still figuring out because it came
    from spotify.
    -However, notice we first make a post request to 'post' our client id and client secret in order for spotify
    to spit us back a token
    -Then, we do a get request and grab the user's data as a JSON object
    -I wrote a few console.logs, and I also grab body.id which is the username
    -Lastly, res.render('home', {username: user}); renders the home.pug page and notice it grabs that username
    variable and displays it on the navigation bar (defined in layout.pug).

    -Here's my issues:
    Notice the URL is some weird /callback?code=... and not /home
    Also, if you go to any other route, we lose the username in the navbar, like the username is no longer 'rendered'

    Possible fixes?
    -This might have something to do with we have to use the next() callback function and do a chain of middleware calls
    to functions, and we keep passing the data we want
    -Check out this link: https://stackoverflow.com/questions/37973266/node-101-changing-the-nav-bar-when-a-user-is-logged-in
        I wonder if we have to use res.locals or something, or look up sessions, like when someone logs in we start
        a session and have data on hand


    NOTE: here is an html to pug converter if you need it:
        https://html-to-pug.com/
 */

app.get('/search', function(req, res, next) {
    console.log("SEARCHING");

    var request = require('request');

    var options = { method: 'GET',
        url: 'https://api.spotify.com/v1/search',
        qs:
            { q: 'Crying Lightning',
                type: 'track',
                limit: '10'},
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

        console.log('\n\n\n')
        result.forEach(function(element) {
            console.log(element[1] + ' - ' + element[0] + ' with ID: ' + element[2]);
        });
        console.log('\n\n\n')


        //console.log(body);
        //console.log(body.tracks);

        //var tester = JSON.parse(body);
        res.render('tags', { name: 'tags', username: req.session.userId, country: req.session.loc, songs: result});
    });

});

app.post('/update', function(req, res) {
    var songsAdded = req.body.songIds;

    console.log(songsAdded);

    res.render('tags', { name: 'tags', username: req.session.userId, country: req.session.loc, ids: songsAdded});
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
