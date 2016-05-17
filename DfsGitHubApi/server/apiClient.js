//GitHubApiClient interacts with the github api service to fork a repository

var util = require('util');
var restClient = require('node-rest-client');

//TODO: make it as 2 parts, getResponse and getFork(?). getResponse will simply take the json response and return it.

//TODO: split in to discrete bjects instead of complex objects...Should we make the input data structure same as the 
//rest client itself ? But doing so binds tightly to the API, so broke them to discrete objects, for easy switching of
//components.
var getResponse = function (apiUrl,credentials,requestHeaders,parameters,callback) {
	//INFO: use closures correctly, putting these at a higher scope would cause interference across requests..
	//POST /repos/:owner/:repo/forks
	//https://api.github.com/repos/maheshrajannan/alg2/forks
	//https://api.github.com/repos/eggheadio/egghead-react-flux-example/forks
	//TODO: get github api from configuration file.

	//TODO / IMPROVEMENT : configure connection options.
	var args = {
			path: parameters,
			headers: requestHeaders
	};
		
	var Client = restClient.Client;
	var apiClient = new Client(credentials);

	console.log('args is' + util.inspect(args, false, null) );
	console.log('apiUrl is' + util.inspect(apiUrl, false, null) );
	console.log('credentials is' + util.inspect(credentials, false, null) );


	// direct way 
	apiClient.post(apiUrl, args,function (data, response) {
		// parsed response body as js object 
		//console.log('data is ' + util.inspect(data, false, null) );
		// raw response 
		//console.log('response is' + util.inspect(response, false, null) );
		callback(data);
	});
};

module.exports.getResponse = getResponse;