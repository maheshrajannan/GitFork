var express = require('express');
var router = express.Router();
var path = require('path');
//https://www.npmjs.com/package/json-parser
//TODO change to all functional names only
var JSON = require('json-parser');
var cors = require('cors');
var fs = require('fs');
var util = require('util');
var corsFilter = require('./corsFilter');
var configReader = require('./configReader');
var requestReader = require('./requestReader');
var ApiClient = require('./apiClient');

router.post('/api/v3/forkDfsGit',cors(corsFilter.corsOptions), function(req, res) {
    //var request ;
    console.log("reached method" );
    var apiConfiguration = configReader.getApiConfiguration();
    console.log('Returning apiConfiguration ' + util.inspect(apiConfiguration, false, null));
    //TODO: chagne to getAPIInputsFromPost
    var apiRequestInputs = requestReader.getGitHubInputsFromPost(req);
    console.log('Returning apiRequestInputs ' + util.inspect(apiRequestInputs, false, null));

    var apiInputs = configReader.getApiInputs(apiConfiguration,apiRequestInputs);
    console.log('Returning apiInputs ' + util.inspect(apiInputs, false, null));

    //INFO: Making API call
    //INFO: https://api.github.com/repos/eggheadio/egghead-react-flux-example/forks

	ApiClient.getResponse(apiConfiguration.uriPath.apiUrl,apiConfiguration.credentials,apiConfiguration.uriPath.requestHeaders, apiInputs.apiParameters,function(response) {
		console.log("response received" + util.inspect(response, false, null));
        res.json(response);
	});

});//end of router.


module.exports = router;
