// Basic modules required:
var express    = require('express')
var app        = express()
var bodyParser = require('body-parser')
var logger     = require('morgan')
var mongoose   = require('mongoose')
var config     = require('./serverSide/config')
var path       = require('path')
var apiRouter  = require('./serverSide/apiRoutes/userRoutes')
var Twit       = require('twit')
var server     = require('http').createServer(app)
var io         = require('socket.io')(server)


//Connect to the database (using mongoose)
mongoose.connect(config.database)

app.use(express.static(path.join(__dirname, 'public')))

var twitter = new Twit({
  consumer_key: 'RZ0FmndPW3bwnmcgrqFc58Rff',
  consumer_secret: 'xsr18knDtlLhnNXx0y65fsNQy5S6lFziBkI9TPVdo5BCMSMDws',
  access_token: '22934806-pAAHDdALQpUniGg9iCTGb25xPHxF2UEUMBjqX2eWE',
  access_token_secret: '1vLkUb6WU7C8hfQ8hhHc7j5IPHjpK3NguRV3NAPIUyuFx'
})

var stream
var searchTerm = 'rock climbing'

io.on('connection', function(socket){
  console.log('twitter stream connected')
  stream = twitter.stream('statuses/filter', { track: searchTerm })
  socket.on('tweet', function(tweet){
    var data = {}
    console.log('twitter stream')
    data.text = tweet.text
    socket.emit('tweets', data)
  })
})

//Configuration our app to handle CORS requests/errors
app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, authorization')
  next()
})

// Middleware
//log all requests to the console
app.use(logger('dev'))
// App Configuration
app.use( bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// Redirects invalid URLS to Index.html
app.get('/', function (req,res){
  res.sendFile(path.join(__dirname+ '/public/index.html'))
})

// app.all('/*', function(req, res, next) {
//     // Just send the index.html for other files to support HTML5Mode
//     res.sendFile('/public/index.html', { root: __dirname });
// });

app.get('/', function(req,res){
	console.log('getting index?')
	res.render('index')
})
//Start the Server
app.use('/api', apiRouter)

// Server Listen crap
server.listen(config.port, function(){
	console.log('it is up and running on port 3000')
})
