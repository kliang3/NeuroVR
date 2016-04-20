(function() {
  "use strict";

  
	$("#control-button2").click(function(){
      ($("#gridX").is(":checked"))? localStorage.setItem("gridX","true"): localStorage.setItem("gridX","false");
      ($("#gridY").is(":checked"))? localStorage.setItem("gridY","true"): localStorage.setItem("gridY","false");
      ($("#gridZ").is(":checked"))? localStorage.setItem("gridZ","true"): localStorage.setItem("gridZ","false");
      ($("#axes-controls").is(':checked'))?localStorage.setItem("axesOn","true"):localStorage.setItem("axesOn","false");
	  localStorage.setItem("backgroundCol",$('#clear_color').val());
  	});



	
})();