var db;
var brain;


function indexedDBOk() {
	return "indexedDB" in window;
}

document.addEventListener("DOMContentLoaded", function() {

	brain = document.querySelector("#brain")
	//No support? Go in the corner and pout.
	if(!indexedDBOk()) return;

	openRequest = indexedDB.open("objfiles",1);

	openRequest.onupgradeneeded = function(e) {
		var thisDB = e.target.result;
		console.log("running onupgradeneeded");
	}

	openRequest.onsuccess = function(e) {
		console.log("running onsuccess");
		db = e.target.result;
		getObjs(); 
	}	

	openRequest.onerror = function(e) {
		//Do something for the error
	}


},false);


function getObjs() {


	db.transaction(["brain"], "readonly").objectStore("brain").openCursor().onsuccess = function(e) {
		var cursor = e.target.result;
		if(cursor) {
			brain.setAttribute('src', cursor.value);
			console.log("adding brain");

		}
	}
}