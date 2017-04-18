if (localStorage.getItem("$userName") != null) {	
	var storedNames = JSON.parse(localStorage.getItem("$allCategories"));
	var storedNumbers = JSON.parse(localStorage.getItem("$depositArray"));
	var sum = storedNumbers.reduce(function(pv, cv) { return pv + cv; }, 0);
	document.write("<table><tr><th>Category</th><th>Budgeted</th><th>Activity</th><th>Available</th></tr>");
	
	for (i = 0; i <= storedNames.length - 1; i++) {
		document.write("<tr><td>" + storedNames[i] + "</td><td><input id=\"blah\" placeholder=\"" + localStorage.getItem("$line"+(i+1)+ "index0") + "\" type=\"text\" class=\"boxes\" style=\"width: 45px;height: 18px;\"></td><td>" + localStorage.getItem("$line"+(i+1)+ "index1") + "</td><td>" + localStorage.getItem("$line"+(i+1)+ "index2") + "</td></tr>");
	}	
	
	for(var i = 0; i < storedNames.length; i++) {
		document.getElementsByClassName('boxes')[i].id = "category"+(i+1);
	}

	
	for (var i = 0; i < storedNames.length; i++) {
		var grabCat = document.getElementById('category'+(i+1));
		grabCat.addEventListener('change', function(event) {
			for (var j = 0; j < storedNames.length; j++) {
				if (document.getElementById('category'+(j+1)).value != "") {
					localStorage.setItem(("$line"+(j+1)+"index0"), document.getElementById('category'+(j+1)).value);
					localStorage.setItem("$line"+(j+1)+"index2", localStorage.getItem("$line"+(j+1)+"index0")-localStorage.getItem("$line"+(j+1)+"index1"));
					//I should rework the following line...
					localStorage.setItem("$myCurrentBalance", sum-localStorage.getItem("$line1index0")-localStorage.getItem("$line2index0")-localStorage.getItem("$line3index0")-localStorage.getItem("$line4index0")-localStorage.getItem("$line5index0")-localStorage.getItem("$line6index0")-localStorage.getItem("$line7index0")-localStorage.getItem("$line8index0")-localStorage.getItem("$line9index0"));
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
		//indexZero.push(localStorage.getItem("$line"+(storedNames.length+1)+"index0"));

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