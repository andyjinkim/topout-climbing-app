var socket = io()

socket.on('connect', function(){
  console.log('connected!')
})

socket.on('tweets', function(tweet){
  var $toastContent = ('<span>' + tweet.text + '</span>')
  console.log('hitting')
  Materialize.toast($toastContent, 5000)
})
