(function() {
  "use strict";

  self.addEventListener("message", function(e) {
    var parsed = parseData(JSON.parse(e.data.data));
    var result = parsed.result;
    var transfer = parsed.transfer;

    self.postMessage(result, transfer);
  });

  function parseData(data) {
    var result = { name: data.name, type: data.type, shapes: [] };
    var transfer = [];

    result.vertices = new Float32Array(flatten(data.vertices));
    transfer.push(result.vertices.buffer);

    data.colors = data.colors || data.color;

    if (data.colors) {
      result.colors = flatten(data.colors);

      if (result.vertices.length === result.colors.length || result.colors.length === 3) {
        result.colors = insertColorAlpha(result.colors);
      } else {
        result.colors = new Float32Array(result.colors);
      }

      transfer.push(result.colors.buffer);
    }

    if (data.normals) {
      result.normals = new Float32Array(flatten(data.normals));
      transfer.push(result.normals.buffer);
    }

    if (data.shapes === undefined) {
      data.shapes = [];
    }

    if (data.indices) {
      data.shapes.push({ indices: data.indices });
    }

    data.shapes.forEach(function(shape) {
      var indices = new Uint32Array(flatten(shape.indices));
      
      if (shape.one_indexed) {
        adjustIndices(indices);
      }
      
      transfer.push(indices.buffer);

      shape.color = shape.color || shape.colors;

      if (Array.isArray(shape.color) && shape.color.length === 3) {
        shape.color.push(1);
      }

      if (shape.color) {
        shape.color = new Float32Array(shape.color);
        transfer.push(shape.color.buffer);
      }
      
      result.shapes.push({ name: shape.name, indices: indices, color: shape.color });
    });

    return {
      result: result,
      transfer: transfer
    };
  }

  function flatten(array, index) {
    if (!Array.isArray(array)) {
      return [array];
    }

    index = index || 0;

    if (index === array.length) {
      return [];
    }

    var result = [];
    var i, count;

    for (i = 0, count = array.length; i < count; i++) {
      result.push.apply(result, flatten(array[i]));
    }

    return result;
  }

  function insertColorAlpha(data_colors) {
    var colors;
    var i, ri, count;

    colors = new Float32Array(data_colors.length * 4 / 3);
    i = ri = 0;
    count = data_colors.length;

    while (i < count) {
      colors[ri++] = data_colors[i++];
      colors[ri++] = data_colors[i++];
      colors[ri++] = data_colors[i++];
      colors[ri++] = 1.0;
    }

    return colors;
  }

  function adjustIndices(indices) {
    var i, count;

    for (i = 0, count = indices.length; i < count; i++) {
      indices[i] = indices[i] - 1;
    }
  }
  
})();

