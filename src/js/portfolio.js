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
	IN.API.Profile("me")
		.fields([
			"firstName", 
			"lastName", 
			"headline", 
			"summary"
		]).result(function(result) {
			alert(JSON.stringify(result));
		});
}
