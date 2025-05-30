console.info("portfolio.js is loaded...");


var run = function(){
	console.info("run() ran...");

// 	$.ajax({
// 		url: "https://api.linkedin.com/v1/people/~?id=jacobuid&format=json",
// 		method: "GET"
// 	}).done(function(response){
// 		console.log(response)
// 	});
	
// 	if(!IN.User.isAuthorized()){
// 		IN.User.authorize(authPassed);
// 	}
	
	IN.API.Profile('https://api.linkedin.com/v1/people/~?format=json')
            .fields("firstName", "picture-urls::(original)", "picture-url")
          .result(displayProfiles)
          .error(displayProfilesErrors);

}

function displayProfiles(data) {      
console.log(data);
}
function displayProfilesErrors(error) {
console.log(error);
}

var authPassed = function(){
	IN.API.Profile("me").result(JacobLinkedInData);
}

