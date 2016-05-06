// Make sure basic ui stuff is done immediately.
//controls the show/hide button, the xyz autorotate buttons (.buttonset)
//makes the load button appear workable 
//
(function() {
  "use strict";
  
  var controls = $("#controls");

  $(".button").button({disabled: false});
  $(".buttonset").buttonset();
  $("#data-range-box").hide();
  
  $("#control-button").click(function() {
    var button_text = $(this).find("span");
    if (controls.is(":visible")) {
      controls.animate({height: 30}, 300).animate({width: 0}, 200, function() { controls.hide(); });
      button_text.text("Show Controls"); //no longer works
    } else {
      controls.show().animate({width: 450}, 200).animate({height: "70%"}, 300); //control bar is only 70% of total hiehg
      button_text.text("Hide Controls"); //no longer works
    }
  });


  setTimeout(function() {
    $("#control-button").click();
  }, 0);
})();


