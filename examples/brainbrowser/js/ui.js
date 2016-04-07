// Make sure basic ui stuff is done immediately.
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
      button_text.text("Show Controls");
    } else {
      controls.show().animate({width: 450}, 200).animate({height: "70%"}, 300);
      button_text.text("Hide Controls");
    }
  });

  setTimeout(function() {
    $("#control-button").click();
  }, 0);
})();


