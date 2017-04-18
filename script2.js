if (localStorage.getItem("$userName") != null) {	
	var storedNames = JSON.parse(localStorage.getItem("$allCategories"));
	var storedNumbers = JSON.parse(localStorage.getItem("$depositArray"));
	var sum = storedNumbers.reduce(function(pv, cv) { return pv + cv; }, 0);
	var indexZero = 0;
	document.write("<table><tr><th>Category</th><th>Budgeted</th><th>Activity</th><th>Available</th></tr>");
	for (i = 0; i <= storedNames.length - 1; i++) {
		document.write("<tr id=\"blah3\" class=\"therows\"><td><img id=\"blah4\" class =\"deleteclass\" src=\"deletebutton.png\" style=\"width:15px;height:15px;\"><input id=\"blah2\" class=\"boxes2\" placeholder=\"" + localStorage.getItem("$category"+(i+1)) + "\"></td><td><input id=\"blah\" placeholder=\"" + localStorage.getItem("$line"+(i+1)+ "index0") + "\" type=\"text\" class=\"boxes\" style=\"width: 45px;height: 18px;\"></td><td>" + localStorage.getItem("$line"+(i+1)+ "index1") + "</td><td>" + localStorage.getItem("$line"+(i+1)+ "index2") + "</td></tr>");
	}	
	
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

	for (var i = 0; i < storedNames.length; i++) {
		var grabRow = document.getElementById('deletebutton'+(i+1));
		grabRow.addEventListener('click', function(event) {
			
			if (confirm('Are you sure that you want to delete this category?')) {
				alert("Create a function to delete a category...");
				for (var j = 0; j < storedNames.length; j++) {
				localStorage.removeItem("$category1");
				localStorage.removeItem("$line"+(j+1)+"index0");
				localStorage.removeItem("$line"+(j+1)+"index1");
				localStorage.removeItem("$line"+(j+1)+"index2");
				document.getElementById("row"+(j+1)).remove();
				storedNames.splice((1-(j+1)), 1);
				localStorage.setItem('$allCategories', JSON.stringify(storedNames));
				location.reload();
			}
			} else {
    			// Do nothing.
			}
		
		});	
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
					storedNames[j] = localStorage.getItem("$category"+(j+1))
					localStorage.setItem('$allCategories', JSON.stringify(storedNames))
					location.reload();
				}
			}
		});	
	}
	
	document.write("<p id=\"addcategory\">Add Category</p><input id=\"categoryname\" style=\"width: 100px;height:15px;\">");
	var grabAddCategory = document.getElementById('addcategory');
	var grabValue = document.getElementById('categoryname');

	grabAddCategory.addEventListener('click', function(event) {
		localStorage.setItem("$category"+(storedNames.length+1), grabValue.value);
		localStorage.setItem("$line"+(storedNames.length+1)+"index0", 0);
		localStorage.setItem("$line"+(storedNames.length+1)+"index1", 0);
		localStorage.setItem("$line"+(storedNames.length+1)+"index2", 0);
	
		var newItem = localStorage.getItem("$category"+(storedNames.length+1));
		storedNames.push(newItem);
		localStorage.setItem('$allCategories', JSON.stringify(storedNames));
		location.reload();	
	})

	document.write("<p><select id=\"newtranscategory\" style=\"width: 125px;height:25px;\"><option>Choose a Category</option><option>Deposit</option></select>  How much was spent/deposited?:  <input id=\"newtransamt\" style=\"width: 30px;height:15px;\"><input id=\"newtranstype\" style=\"width: 30px;height:15px;\"><input id=\"newtranstype2\" style=\"width: 30px;height:15px;\"></p>");
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
	
	document.write("Income: " + localStorage.getItem("$depositArray"));
	document.getElementById('newtransamt').addEventListener('change', function(event) {

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
				localStorage.setItem("$line"+(i+1)+"index2", localStorage.getItem("$line"+(i+1)+"index0")-localStorage.getItem("$line"+(i+1)+"index1"));		
				location.reload();
			} 
		}

	});	
};