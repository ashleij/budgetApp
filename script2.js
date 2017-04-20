if (localStorage.getItem("$userName") != null) {	
	var storedNames = JSON.parse(localStorage.getItem("$allCategories"));
	var allIndexZero = JSON.parse(localStorage.getItem("$blah0"));
	var allIndexOne = JSON.parse(localStorage.getItem("$blah1"));
	var allIndexTwo = JSON.parse(localStorage.getItem("$blah2"));
	var storedNumbers = JSON.parse(localStorage.getItem("$depositArray"));
	var sum = storedNumbers.reduce(function(pv, cv) { return pv + cv; }, 0);
	var indexZero = 0;
	var shiftRows = false;
	var tokenNum = 0;
	document.write("<table id=\"chartheader\"><tr><th>Category</th><th>Budgeted</th><th>Activity</th><th>Available</th></tr>");

	for (i = 0; i <= storedNames.length - 1; i++) {
		document.write("<tr id=\"blah3\" class=\"therows\"><td><img id=\"blah4\" class=\"deleteclass\" src=\"deletebutton.png\" style=\"width:15px;height:15px;\"><input id=\"blah2\" class=\"boxes2\" placeholder=\"" + storedNames[i] + "\"></td><td><input id=\"blah\" placeholder=\"" + allIndexZero[i] + "\" type=\"text\" class=\"boxes\"></td><td class=\"otherboxes\">" + allIndexOne[i] + "</td><td class=\"otherboxes\">" + allIndexTwo[i] + "</td></tr>");
	}	
		
	document.write("Income Log: " + localStorage.getItem("$depositArray")+"<p></p>");
	document.write("<tr><p><select id=\"newtranscategory\" style=\"width: 125px;height:25px;\"><option>Choose a Category</option><option>Deposit</option></select>  How much was spent/deposited?:     <input id=\"newtransamt\" class=\"inputboxes\">&nbsp;<span id=\"newtransamt2\">SUBMIT</span><input id=\"newtranstype\" style=\"width: 30px;height:15px;\"><input id=\"newtranstype2\" style=\"width: 30px;height:15px;\"></p></tr></table>");
	
	for(var i = 0; i < storedNames.length; i++) {
		document.getElementsByClassName('boxes')[i].id = "budgeted"+(i+1);
	}

	for(var i = 0; i < storedNames.length; i++) {
		document.getElementsByClassName('boxes2')[i].id = "category"+(i+1);
	}

	for(var i = 0; i < storedNames.length; i++) {
		document.getElementsByClassName('therows')[i].id = "row"+(i+1);
	}

	for(var i = 0; i < storedNames.length; i++) {
		document.getElementsByClassName('deleteclass')[i].id = "deletebutton"+(i+1);
	}

	var getIndex = function(token) {
		return token.replace("deletebutton", "");
	}
	
	for (var i = 0; i < storedNames.length; i++) {
		eval("var grabRow" + (i+1) +"= document.getElementById('deletebutton'+(i+1));");
		eval("grabRow" + (i+1) + ".addEventListener('click', function(event) {if (localStorage.getItem(\"$line"+(i+1)+"index0\") == 0) { if (confirm('Are you sure that you want to delete this category?')) {localStorage.setItem('$shiftRows', true);storedNames.splice("+i+", 1);localStorage.setItem('$allCategories', JSON.stringify(storedNames));allIndexZero.splice("+i+", 1);localStorage.setItem('$blah0', JSON.stringify(allIndexZero));allIndexOne.splice("+i+", 1);localStorage.setItem('$blah1', JSON.stringify(allIndexOne));allIndexTwo.splice("+i+", 1);localStorage.setItem('$blah2', JSON.stringify(allIndexTwo));localStorage.setItem('$tokenNum',"+(i+1)+");} else {}} else { alert(\"You must set the budgeted value to 0 before deleting a category.\")}location.reload()});");	
		var toShift = localStorage.getItem("$shiftRows");	
	}

	if (toShift == "true") {
		tokenNum = parseInt(localStorage.getItem('$tokenNum'));
		for (var j = tokenNum; j < storedNames.length +1; j++) {	
			localStorage.setItem("$category"+(j), localStorage.getItem("$category"+(j+1)));
			localStorage.setItem("$line"+(j)+"index0", localStorage.getItem("$line"+(j+1)+"index0"));
			localStorage.setItem("$line"+(j)+"index1", localStorage.getItem("$line"+(j+1)+"index1"));
			localStorage.setItem("$line"+(j)+"index2", localStorage.getItem("$line"+(j+1)+"index2"));	
		}			
		toShift = "false";
		localStorage.setItem("$shiftRows", toShift);
		location.reload();
	}	
		
	for (var i = 0; i < storedNames.length; i++) {
		var grabBudg = document.getElementById('budgeted'+(i+1));
		grabBudg.addEventListener('change', function(event) {
			for (var j = 0; j < storedNames.length; j++) {
				if (document.getElementById('budgeted'+(j+1)).value != "") {
					localStorage.setItem(("$line"+(j+1)+"index0"), document.getElementById('budgeted'+(j+1)).value);
					localStorage.setItem("$line"+(j+1)+"index2", localStorage.getItem("$line"+(j+1)+"index0")-localStorage.getItem("$line"+(j+1)+"index1"));	
					for (var x = 0; x < storedNames.length; x++) {
						indexZero += parseInt(localStorage.getItem("$line"+(x+1)+"index0"));
					}
					localStorage.setItem("$myCurrentBalance", sum-indexZero);
					allIndexZero[j] = [];
					allIndexZero[j] = localStorage.getItem("$line"+(j+1)+"index0");
					allIndexTwo[j] = [];
					allIndexTwo[j] = localStorage.getItem("$line"+(j+1)+"index2");
					localStorage.setItem('$blah0', JSON.stringify(allIndexZero));
					localStorage.setItem('$blah2', JSON.stringify(allIndexTwo));
					location.reload();
				}
			}
		});	
	}

	for (var i = 0; i < storedNames.length; i++) {
		var grabCat = document.getElementById('category'+(i+1));
		grabCat.addEventListener('change', function(event) {
			for (var j = 0; j < storedNames.length; j++) {
				if (document.getElementById('category'+(j+1)).value != "") {
					localStorage.setItem(("$category"+(j+1)), document.getElementById('category'+(j+1)).value);
					storedNames[j] = [];
					storedNames[j] = localStorage.getItem("$category"+(j+1))
					localStorage.setItem('$allCategories', JSON.stringify(storedNames))
					location.reload();
				}
			}
		});	
	}
	
	document.write("<div id=\"adddiv\"><input id=\"categoryname\" class=\"inputboxes\"><p id=\"addcategory\">&nbsp;&nbsp;ADD CATEGORY</p></div>");
	var grabAddCategory = document.getElementById('addcategory');
	var grabValue = document.getElementById('categoryname');

	grabAddCategory.addEventListener('click', function(event) {
		localStorage.setItem("$category"+(storedNames.length+1), grabValue.value);
		localStorage.setItem("$line"+(storedNames.length+1)+"index0", 0);
		localStorage.setItem("$line"+(storedNames.length+1)+"index1", 0);
		localStorage.setItem("$line"+(storedNames.length+1)+"index2", 0);
		var newItem = localStorage.getItem("$category"+(storedNames.length+1));
		var iZero = localStorage.getItem("$line"+(storedNames.length+1)+"index0");
		var iOne = localStorage.getItem("$line"+(storedNames.length+1)+"index1");
		var iTwo = localStorage.getItem("$line"+(storedNames.length+1)+"index2");
		storedNames.push(newItem);
		allIndexZero.push(iZero);
		allIndexOne.push(iOne);
		allIndexTwo.push(iTwo);
		localStorage.setItem('$allCategories', JSON.stringify(storedNames));
		localStorage.setItem('$blah0', JSON.stringify(allIndexZero));
		localStorage.setItem('$blah1', JSON.stringify(allIndexOne));
		localStorage.setItem('$blah2', JSON.stringify(allIndexTwo));
		location.reload();	
	})

	//document.write("<p><select id=\"newtranscategory\" style=\"width: 125px;height:25px;\"><option>Choose a Category</option><option>Deposit</option></select>  How much was spent/deposited?:     <input id=\"newtransamt\" class=\"inputboxes\">&nbsp;<span id=\"newtransamt2\">SUBMIT</span><input id=\"newtranstype\" style=\"width: 30px;height:15px;\"><input id=\"newtranstype2\" style=\"width: 30px;height:15px;\"></p>");
	var select = document.getElementById("newtranscategory"); 
	
	for(var i = 0; i < storedNames.length; i++) {
		var opt = storedNames[i];
		var el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		select.appendChild(el);
	}
	//**MVP doesnt have these features, so I've set them to "hidden".**//
	document.getElementById("newtranstype").style.visibility = "hidden";
	document.getElementById("newtranstype2").style.visibility = "hidden";	
	//document.write("Income: " + localStorage.getItem("$depositArray")+"<p></p>");
	document.getElementById('newtransamt2').addEventListener('click', function(event) {

		if (document.getElementById('newtranscategory').value == "Deposit") {
			var beANum = parseInt(document.getElementById('newtransamt').value);
			storedNumbers.push(beANum);
			localStorage.setItem("$depositArray", JSON.stringify(storedNumbers))
			localStorage.setItem("$myCurrentBalance", parseInt(localStorage.getItem("$myCurrentBalance"))+beANum);	
			location.reload();
		}				
		for (i = 0; i <= storedNames.length; i++) {
			if (document.getElementById('newtranscategory').value == localStorage.getItem("$category"+(i+1))) {
				localStorage.setItem("$line"+(i+1)+"index1", document.getElementById('newtransamt').value);
				allIndexOne[i] = [];
				allIndexOne[i] = localStorage.getItem("$line"+(i+1)+"index1");
				localStorage.setItem('$blah1', JSON.stringify(allIndexOne));
				localStorage.setItem("$line"+(i+1)+"index2", localStorage.getItem("$line"+(i+1)+"index0")-localStorage.getItem("$line"+(i+1)+"index1"));
				allIndexTwo[i] = [];
				allIndexTwo[i] = localStorage.getItem("$line"+(i+1)+"index2");
				localStorage.setItem('$blah2', JSON.stringify(allIndexTwo));
				location.reload();
			} 
		}
	});	
};