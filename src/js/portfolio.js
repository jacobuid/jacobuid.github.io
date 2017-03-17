console.info("portfolio.js is loaded...");

var run = function(){
	console.info("run() ran...");

	$.ajax({
		url: "https://api.linkedin.com/v1/people/~?id=jacobuid&format=json",
		method: "GET"
	}).done(function(response){
		console.log(response)
	});

}
