(function() {
  "use strict";
  
  self.addEventListener("message", function(e) {
    var result = parse(e.data.data);
    self.postMessage(result, [result.values.buffer]);
  });
  
  function parse(string) {
    var values;
    var lines, value;
    var i, num_vals, min, max;
  
    string = string.trim();

    lines = string.split("\n");
    num_vals = lines.length;
    values = new Float32Array(num_vals);
    value = parseFloat(lines[0].trim().split(/\s+/)[4]);
    values[0] = value;
    min = value;
    max = value;

    for(i = 1; i < num_vals; i++) {
      value = parseFloat(lines[i].trim().split(/\s+/)[4]);
      values[i] = value;
      min = Math.min(min, value);
      max = Math.max(max, value);
    }

    return {
      values: new Float32Array(values),
      min: min,
      max: max
    };
  }
 
})();

