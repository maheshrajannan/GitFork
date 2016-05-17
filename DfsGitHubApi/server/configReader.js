
var util = require('util');
var properties = require ("properties-parser");
var util = require('util');

var getConfig = function(dir,fileName) {
    var config;
    if(dir!= null && dir != undefined
     && fileName != null && fileName != undefined) {
        console.log('reading properties'+dir+''+fileName );
        //INFO: note, that file location is relative to the node project , not relative to configReader.js (this code)
        // If the file is not there you will get a weird error.
        config = properties.read(dir+fileName);
        //console.log('read properties'+ config );
    }else {
        console.log('ERROR reading properties from ' + dir + ' / ' + fileName );
    }    
    console.log('Returning config '+util.inspect(config, false, null));
    return config;
};

//TODO: move getGetApiConfiguration in to a separate file, if more than 3 methods are added here.
//TODO IMPROVEMENT: there could be a better way of just putting 
//gitHub.credentials.user and parsing it in to appropriate object structure.
var getApiConfiguration = function() {
    var apiConfigProperties = getConfig('./config/','ApiConfiguration.properties');
    var apiConfiguration;
    var credentials;
    var uriPath,requestHeaders;
    if(apiConfigProperties!= null && apiConfigProperties != undefined
     && apiConfigProperties.user != null && apiConfigProperties.password != undefined) {
        console.log('reading ApiConfiguration.properties successful' );
        credentials = {user:apiConfigProperties.user,password:apiConfigProperties.password};

        parameters = {owner: apiConfigProperties.owner , 
            ownerRepository:apiConfigProperties.ownerRepository,resourceType:apiConfigProperties.resourceType};    

        requestHeaders = {"Content-Type":apiConfigProperties.headersContentType , "User-Agent":apiConfigProperties.headersUserAgent};

        //path: { "userName": "eggheadio" , "repositoryName":"egghead-react-flux-example","action":"forks"}, // path substitution var 
        //path: { "owner": "eggheadio" , "ownerRepository":"react-native-gh-notetaker","resourceType":"forks"}, // path substitution var 
        uriPath={ apiUrl: apiConfigProperties.apiUrl , parameters : parameters , requestHeaders : requestHeaders};
        
        apiConfiguration = {credentials:credentials,uriPath:uriPath};
    }else {
        console.log('ERROR reading properties from ./config/ApiConfiguration.properties' + util.inspect(config, false, null));
    }    
    return apiConfiguration;
};

//INFO: chooses the defaults from api configuration input, if api input is not having a particular value.
//NOTE: if this behaviour is undesirable, then that needs to be handled in UI, as an API this is written 
//for bad (UI) clients also...But is this really desirable ? TODO: re-evaluate this behavior

var getApiInputs = function(apiConfigurationInput,apiRequestInput) {
    var apiConfiguration;
    var apiParameters;
    var apiInputs;

    var owner;
    var ownerRepository;
    
    if(apiRequestInput.gitHubOrganizationName != null && apiRequestInput.gitHubOrganizationName != undefined) {
        owner=apiRequestInput.gitHubOrganizationName;
    } else{
        //replace console.log with some good logger.
        console.log("ERROR Not passed gitHubOrganizationName " + util.inspect(apiRequestInput, false, null)
         + " so using api configuration " + util.inspect(apiConfigurationInput, false, null));
        owner=apiConfigurationInput.uriPath.parameters.owner;
    }
    apiConfigurationInput.uriPath.parameters.owner = null;
    
    if(apiRequestInput.projectArtifacts != null && apiRequestInput.artifact != undefined) {
        ownerRepository=apiRequestInput.artifact;

    } else{
        //replace console.log with some good logger.
        console.log("ERROR Not passed artifact " + util.inspect(apiRequestInput, false, null)
         + " so using api configuration " + util.inspect(apiConfigurationInput, false, null));
        ownerRepository=apiConfigurationInput.uriPath.parameters.ownerRepository;
    }    

    apiConfigurationInput.uriPath.parameters.ownerRepository = null;

    apiParameters = {owner:owner,ownerRepository:ownerRepository,resourceType:apiConfigurationInput.uriPath.parameters.resourceType};

    apiConfigurationInput.uriPath.parameters.resourceType = null;
    apiConfigurationInput.uriPath.parameters = null;

    apiInputs ={apiConfiguration : apiConfigurationInput, apiParameters : apiParameters};


    return apiInputs;
}

module.exports.getApiConfiguration = getApiConfiguration;
module.exports.getApiInputs = getApiInputs;