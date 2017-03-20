console.info("portfolio.js is loaded...");

var run = function(){
	console.info("run() ran...");

// 	$.ajax({
// 		url: "https://api.linkedin.com/v1/people/~?id=jacobuid&format=json",
// 		method: "GET"
// 	}).done(function(response){
// 		console.log(response)
// 	});
	
	IN.Event.on(IN, "auth", authPassed);
	
	

}

var authPassed = function(){
	IN.API.Profile("me").result(JacobLinkedInData);
}

var JacobLinkedInData = function (profiles) {
    var profile = profiles.values[0];
    var id=profile.id;
    var firstName=profile.firstName; 
    var lastName=profile.lastName; 
    var photo=profile.pictureUrl; 
    var headline=profile.headline; 

    //use information captured above
}
