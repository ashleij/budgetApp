var grabNewUser = document.getElementById('newuser');
var grabRedButton = document.getElementById('delet');

var start = function() {
	grabNewUser.addEventListener('click', function(event) {
		newUserPrompt();
	})
	grabRedButton.addEventListener('click', function(event) {
		localStorage.clear();
		location.reload();
	})
};

var newUserPrompt = function() {
	//document.body.innerHTML = "";
	var text = "What is your name?";
	if (localStorage.getItem("$userName") != null){
	document.write("<p>!!! WARNING, " + localStorage.getItem("$userName") + ", THIS WILL DELETE YOUR CURRENT BUDGET !!!</p>");
	}
	document.write(text.bold());
	document.write("<form id=\"form\" onsubmit=\"return false;\">First name: <input type=\"text\" id=\"userInput\"><br><input type=\"submit\" onclick=\"userName()\"></form>");
};

function userName() {
	var input = document.getElementById("userInput");
	//document.body.innerHTML = "";
	localStorage.setItem("$userName", input.value);
	document.write("Welcome " + localStorage.getItem("$userName").bold() + "!");
	localStorage.setItem("$category1", "rent");
	localStorage.setItem("$category2", "phone");
	localStorage.setItem("$category3", "food");
	localStorage.setItem("$category4", "internet");
	localStorage.setItem("$category5", "gifts");
	localStorage.setItem("$category6", "vacation");
	localStorage.setItem("$category7", "emergency");
	var allCategories = [localStorage.getItem("$category1"), localStorage.getItem("$category2"), localStorage.getItem("$category3"), localStorage.getItem("$category4"), localStorage.getItem("$category5"), localStorage.getItem("$category6"), localStorage.getItem("$category7")];
	localStorage.setItem("$allCategories", JSON.stringify(allCategories));

	localStorage.setItem("$line1index0", 0);
	localStorage.setItem("$line2index0", 0);
	localStorage.setItem("$line3index0", 0);
	localStorage.setItem("$line4index0", 0);
	localStorage.setItem("$line5index0", 0);
	localStorage.setItem("$line6index0", 0);
	localStorage.setItem("$line7index0", 0);

	localStorage.setItem("$line1index1", 0);
	localStorage.setItem("$line2index1", 0);
	localStorage.setItem("$line3index1", 0);
	localStorage.setItem("$line4index1", 0);
	localStorage.setItem("$line5index1", 0);
	localStorage.setItem("$line6index1", 0);
	localStorage.setItem("$line7index1", 0);

	localStorage.setItem("$line1index2", 0);
	localStorage.setItem("$line2index2", 0);
	localStorage.setItem("$line3index2", 0);
	localStorage.setItem("$line4index2", 0);
	localStorage.setItem("$line5index2", 0);
	localStorage.setItem("$line6index2", 0);
	localStorage.setItem("$line7index2", 0);

	localStorage.setItem("$myCurrentBalance", 0);
	var depositArray = [];
	localStorage.setItem("$depositArray", JSON.stringify(depositArray));
	var budgetedArray = [];
	localStorage.setItem("$budgetedArray", JSON.stringify(budgetedArray));
	location.reload();	
};

start();