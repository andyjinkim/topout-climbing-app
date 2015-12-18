// Basic modules required:
var express    = require('express')
var app        = express()
var bodyParser = require('body-parser')
var logger     = require('morgan')
var mongoose   = require('mongoose')
var config     = require('./serverSide/config')
var path       = require('path')
var apiRouter  = require('./serverSide/apiRoutes/userRoutes')


//Connect to the database (using mongoose)
mongoose.connect(config.database)

app.use(express.static(path.join(__dirname, 'public')))

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
app.listen(config.port, function(){
	console.log('it is up and running on port 3000')
})
