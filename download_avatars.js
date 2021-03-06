var request = require('request');
var token =  require("./secrets");
var fs = require('fs');

var args = process.argv.slice(2);
var owner = args[0];
var repo = args[1];


function getRepoContributors(repoOwner, repoName, cb) {
	if (repoOwner === undefined || repoName === repoName){
		return console.log("Error: Please Specify Repo Name and Repo Name")
	}
	
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization' : token.GITHUB_TOKEN 
    }
  };

  request(options, function(err, res, body) {
  	var to_send = JSON.parse(body)
    cb(err, to_send);
  });
}


getRepoContributors(owner, repo, function(err, result) {
  console.log("Errors:", err);
  for (var i = 0; i < result.length; i++){
  	console.log(result[i].avatar_url);
  	downloadImageByURL(result[i].avatar_url, "avatar_"+i+".jpg")
  }
});

function downloadImageByURL(url, filePath) {
  // ...
  request.get(url)
  .pipe(fs.createWriteStream(filePath))
}


