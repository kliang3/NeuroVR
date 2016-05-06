var Storage = function () {

	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

	if ( indexedDB === undefined  ) {

		console.warn( 'Storage: IndexedDB not available.' );
		return { init: function () {}, get: function () {}, set: function () {}, clear: function () {} };

	}

	var name = 'brain-files';
	var version = 1;

	var database;

	return {

		init: function ( callback ) {

			var request = indexedDB.open( name, version );
			request.onupgradeneeded = function ( event ) {

				var db = event.target.result;

				if ( db.objectStoreNames.contains( 'files' ) === false ) {

					db.createObjectStore( 'files' );
			
				}

			};
			request.onsuccess = function ( event ) {

				database = event.target.result;

				callback();

			};
			request.onerror = function ( event ) {

				console.error( 'IndexedDB', event );

			};


		},

		get: function ( callback ) {

			var transaction = database.transaction( [ 'files' ], 'readwrite' );
			var objectStore = transaction.objectStore( 'files' );
			var request = objectStore.get( 0 );
			request.onsuccess = function ( event ) {

				callback( event.target.result );

			};

		},

		set: function ( data, callback ) {

			var start = performance.now();

			var transaction = database.transaction( [ 'states' ], 'readwrite' );
			var objectStore = transaction.objectStore( 'states' );
			var request = objectStore.put( data, 0 );
			request.onsuccess = function ( event ) {

				console.log( '[' + /\d\d\:\d\d\:\d\d/.exec( new Date() )[ 0 ] + ']', 'Saved state to IndexedDB. ' + ( performance.now() - start ).toFixed( 2 ) + 'ms' );

			};

		},

		clear: function () {

			var transaction = database.transaction( [ 'states' ], 'readwrite' );
			var objectStore = transaction.objectStore( 'states' );
			var request = objectStore.clear();
			request.onsuccess = function ( event ) {

				console.log( '[' + /\d\d\:\d\d\:\d\d/.exec( new Date() )[ 0 ] + ']', 'Cleared IndexedDB.' );

			};

		}

	};

};


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
	
			thisDB.createObjectStore("brain"); 
			console.log("adding");

	


		
		
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