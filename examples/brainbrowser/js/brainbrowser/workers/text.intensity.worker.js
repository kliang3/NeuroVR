(function() {
  "use strict";
  
  self.addEventListener("message", function(e) {
    var result = parse(e.data.data);
    self.postMessage(result, [result.values.buffer]);
  });
  
  function parse(string) {
    var result = {};
    var i, count, min, max;
  
    result.values = new Float32Array(string.trim().split(/\s+/).map(parseFloat));
    min = result.values[0];
    max = result.values[0];

    for(i = 1, count = result.values.length; i < count; i++) {
      min = Math.min(min, result.values[i]);
      max = Math.max(max, result.values[i]);
    }

    result.min = min;
    result.max = max;

    return result;
  }
 
})();

