var util = require('util');


var getGitHubInputsFromPost= function(req) {

    //INFO: it is possible to extract the inputs from req.body through util.inspect library.
    //However we cannot add validations to it. It is important to add validation for
    //each field due to the dynamic typing of javascript object
    var gitHubInputs;
    if(req!= null && req != undefined
     && req.body != null && req.body != undefined
      && req.body.artifact != null && req.body.artifact != undefined
      && req.body.container != null && req.body.container != undefined
      && req.body.gitHubOrganizationName != null && req.body.gitHubOrganizationName != undefined
      && req.body.groupPrefix != null && req.body.groupPrefix != undefined
      && req.body.jsonWebToken != null && req.body.jsonWebToken != undefined
      && req.body.projectArtifacts != null && req.body.projectArtifacts != undefined
      && req.body.projectType != null && req.body.projectType != undefined
      && req.body.technology != null && req.body.technology != undefined
      && req.body.version != null && req.body.version != undefined
      ) {
        gitHubInputs = {
            artifact:req.body.artifact,
            container:req.body.container,
            gitHubOrganizationName:req.body.gitHubOrganizationName,
            groupPrefix:req.body.groupPrefix,
            jsonWebToken:req.body.jsonWebToken,
            projectArtifacts:req.body.projectArtifacts,
            projectType:req.body.projectType,
            technology:req.body.technology,
            version:req.body.version
        };
        //TODO IMPROVEMENT: replace console.log with proper logging.
        console.log(' INFO getGitHubInputsFromPost input is '+ util.inspect(req.body, false, null));
    } else {
        //TODO IMPROVEMENT: replace console.log with proper logging.
        console.log(' ERROR getGitHubInputsFromPost input is '+ util.inspect(req.body, false, null));
    }
    return gitHubInputs;

};

module.exports.getGitHubInputsFromPost = getGitHubInputsFromPost;