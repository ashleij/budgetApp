var grabNewUser = document.getElementById('newuser');
var grabRedButton = document.getElementById('delet');

var start = function() {
	grabNewUser.addEventListener('click', function(event) {
		newUserPrompt();
	})
	grabRedButton.addEventListener('click', function(event) {
		if (confirm('Are you sure you want to delete everything?')) {
			localStorage.clear();
			location.reload();
		} else {
			//Do Nothing.
		}
	})
};

var newUserPrompt = function() {
	var text = "What is your name?";
	if (localStorage.getItem("$userName") != null){
	document.write("<p>!!! WARNING, " + localStorage.getItem("$userName") + ", THIS WILL DELETE YOUR CURRENT BUDGET !!!</p>");
	}
	document.write(text.bold());
	document.write("<form id=\"form\" onsubmit=\"return false;\">First name: <input type=\"text\" id=\"userInput\"><br><input type=\"submit\" onclick=\"userName()\"></form>");
};

function userName() {
	localStorage.clear();
	var input = document.getElementById("userInput");
	localStorage.setItem("$userName", input.value);
	localStorage.setItem("$myCurrentBalance", 0);
	var allCategories = [];
	localStorage.setItem("$allCategories", JSON.stringify(allCategories));
	var depositArray = [];
	localStorage.setItem("$depositArray", JSON.stringify(depositArray));
	var budgetedArray = [];
	localStorage.setItem("$budgetedArray", JSON.stringify(budgetedArray));
	var parseIndexZero = [];
	localStorage.setItem("$blah0", JSON.stringify(parseIndexZero));
	var parseIndexOne = [];
	localStorage.setItem("$blah1", JSON.stringify(parseIndexOne));
	var parseIndexTwo = [];
	localStorage.setItem("$blah2", JSON.stringify(parseIndexTwo));
	location.reload();	
};

start();