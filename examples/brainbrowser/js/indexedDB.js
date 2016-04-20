var reader = new FileReader(); 

document.getElementById("obj_file_submit").addEventListener("click", function(){
	var file = document.getElementById("objfile");
	reader.readAsDataURL(file.files[0]);
}); 

var db; 


function indexedDBOk(){
	return "indexedDB" in window; 
}

document.getElementById("obj_file_submit").addEventListener("click", function(){

	if (!indexedDBOk()) return; 

	var openRequest = indexedDB.open("objfiles",1);

	openRequest.onupgradeneeded = function(e){ 
		var thisDB = e.target.result; 

		console.log("running onupgradeneed"); 

		
		thisDB.createObjectStore("brain",{autoIncrement:true}); 
	}

	openRequest.onsuccess = function (e) { 
		console.log("running onsuccess");
		db = e.target.result; 
		addObj(); 
	}
	
	openRequest.onerror = function (e) {
	}

}, false);

function addObj() { 
	console.log("About to add obj file"); 
	
	var transaction = db.transaction(["brain"], 
		"readwrite");
	
	var store = transaction.objectStore("brain");
	
	var request= store.add(reader.result); 
	
	request.onerror = function(e){ 
		console.log("Error", e.target.error.name); 
	}

	request.onsuccess = function(e){
		console.log("Did it"); 
	}
}