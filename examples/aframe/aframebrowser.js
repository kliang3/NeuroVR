// add axis if previously selected 
var xaxis = document.querySelector("#xaxis");
var yaxis = document.querySelector("#yaxis");
var zaxis = document.querySelector("#zaxis");
if(localStorage.getItem('axesOn')==="false"){
	xaxis.setAttribute('visible', false);
	yaxis.setAttribute('visible', false);
	zaxis.setAttribute('visible', false);   
}
// add grid if previously selected 
var xgrid = document.querySelector("#xgrid");
var ygrid = document.querySelector("#ygrid");
var zgrid = document.querySelector("#zgrid");

localStorage.getItem('gridX')==="false"? xgrid.setAttribute('visible', false): xgrid.setAttribute('visible',true);
localStorage.getItem('gridY')==="false"? ygrid.setAttribute('visible', false): ygrid.setAttribute('visible',true);
localStorage.getItem('gridZ')==="false"? zgrid.setAttribute('visible', false): zgrid.setAttribute('visible',true);

 
//autorotate add  


//background color
var backgroundCol = localStorage.getItem("backgroundCol");
backgroundCol=backgroundCol.slice(2);
backgroundCol='#'+backgroundCol
var aframeBackground = document.querySelector("#backgroundCol");
aframeBackground.setAttribute('color', backgroundCol);


// add model from previously selected 

	//include opacity settings 

// add mesh-mode if previously selected  

// use color map of previously selected model 

// load annotation from previously selected model 

// exit a-frame mode, go back to previous browser 

//add  a loading icon in aframe 