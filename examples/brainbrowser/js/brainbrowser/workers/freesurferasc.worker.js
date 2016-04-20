(function() {
  "use strict";
      
  self.addEventListener("message", function(e) {
    var result = parse(e.data.data);
    var transfer = [
      result.vertices.buffer,
      result.shapes[0].indices.buffer
    ];

    self.postMessage(result, transfer);
  });
  
  function parse(data) {
    var vertices, indices;
    var counts;
    var vertex_count;
    var face_count;
    var line;
    var i, ci;
    
    var result = {};

    data = data.split("\n");
    
    counts = data[1].trim().split(/\s+/);
    vertex_count = parseInt(counts[0], 10);
    face_count = parseInt(counts[1], 10);

    vertices = new Float32Array(vertex_count * 3);
    indices = new Uint32Array(face_count * 3);

    for (i = 0; i < vertex_count; i++) {
      line = data[i+2].trim().split(/\s+/);

      ci = i * 3;
      vertices[ci]     = parseFloat(line[0]);
      vertices[ci + 1] = parseFloat(line[1]);
      vertices[ci + 2] = parseFloat(line[2]);
    }
    
    for (i = 0; i < face_count; i++) {
      line = data[i + vertex_count + 2].trim().split(/\s+/);
      
      ci = i * 3;
      indices[ci]     = parseInt(line[0], 10);
      indices[ci + 1] = parseInt(line[1], 10);
      indices[ci + 2] = parseInt(line[2], 10);
    }
    
    result.type = "polygon";
    result.vertices = vertices;
    result.shapes = [
      {
        indices: indices
      }
    ];

    return result;
  }
})();

