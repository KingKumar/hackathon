var http = require('http');
var url = require('url');

var twitter = require('ntwitter');

var geocoderProvider = 'google';
var httpAdapter = 'http';

var twit = new twitter({
  consumer_key: 'wqERQjyGsZNzWZdbd9P6w',
  consumer_secret: 'l96ZBvNhjtbHx8j7npVBZNu5zzOwGPB386wdHtdxr0',
  access_token_key: '1924673076-cgs9Y6VPcNMs09fjjLFoDWd1BS2LqU1DBFiAML8',
  access_token_secret: 'KdQXA1r3gVpqNnfy5uiHTNGGrf9sz5IeHXlNMwPVgCAsc'
});


var extra = {
	apiKey: 'AIzaSyAGMoM9QFBIxmUlmuIKn92HHt6NGL5lly8'
};

var geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter, extra);

geocoder.geocode('Columbus Ohio', function(err, res){
	if (err)
		console.log(err);
	var location = (res[0]['longitude'] - 1) + ',' + (res[0]['latitude'] - 1) + ',' + (res[0]['longitude'] + 1) + ',' + (res[0]['latitude'] + 1)
	console.log(location);
	twit.stream('statuses/filter', {'locations': location}, function(stream) {
  		stream.on('data', function (data) {
    		console.log(data);
  		});
  		stream.on('error', function(response){
  			console.log(response);
  		});
  		stream.on('destroy', function(response){
  			console.log(response);
  		});
	setTimeout(stream.destroy, 5000);
});

});



