(function() {
  "use strict";
  /**
  * @doc function
  * @name BrainBrowser.static methods:createTreeStore
  * @returns {object} Tree store object.
  * @description
  * Factory function to create a flexible tree storage abstract data type.
  * ```js
  * BrainBrowser.createTreeStore();
  * ```
  */
  BrainBrowser.createTreeStore = function() {

    var tree = {};

    return {

      /**
      * @doc function
      * @name BrainBrowser.tree store:set
      * @param {multiple} keys Keys that indicate the path to the node of the tree where to store the value.
      * @param {any} value Final argument given is the value to be stored.
      *
      * @description
      * Store a value in a tree structure of arbitrary arity.
      *
      * ```js
      * var ts = BrainBrowser.createTreeStore();
      * ts.set(x, y, z, "Some text about this point.");
      * ts.set("annotations", x, y, z, { image: "brain.png", article: "paper.pdf" });
      * ```
      *
      */
      // a tree structure 
      // 1: 
      // 2: 
          //1: 
          //2: 
      //3: 
      set: function() {
        var value = arguments[arguments.length - 1]; //only the value can be stored in the last argument 
        var keys = Array.prototype.slice.call(arguments, 0, arguments.length - 1); //converts arguments into an array [x,y,z] 
        //provides the key (x,y,z) where to store the value 
        var subtree = tree;
        var current_key;
        var i, count;
        var error_message;

        for (i = 0, count = keys.length - 1; i < count; i++) {
          current_key = keys[i];
          if (subtree[current_key] && typeof subtree[current_key] !== "object") {
            error_message = "Hash key '[" + keys.slice(0, i + 1).join("][") +
              "]' has already been set to a non-object value.\n" +
              "Cannot set '[" + keys.join("][") + "]'";

            BrainBrowser.events.triggerEvent("error", { message: error_message });
            throw new Error(error_message);
          }
          if (!subtree[current_key]) {
            subtree[current_key] = {};
          }

          subtree = subtree[current_key]; //iterates all the place to where to place the value 
        }
        current_key = keys[i]; 

        subtree[current_key] = value; //places the value at the last spot of the key (eg. Z when key = x, y, z)
      },

      /**
      * @doc function
      * @name BrainBrowser.tree store:get
      * @param {multiple} keys Keys that indicate the path to the node of the tree from which to retrieve the value.
      *
      * @returns {any} The value stored at the node (or **null** if it doesn't exist).
      *
      * @description
      * Retrieve a configuration parameter.
      *
      * ```js
      * var ts = BrainBrowser.createTreeStore();
      * ts.set(x, y, z, "Some text about this point.");
      * ts.get(x, y, z); // => returns "Some text about this point."
      * ```
      *
      */
      get: function() {
        var keys = Array.prototype.slice.call(arguments); //turns arguments into an array 
        var subtree = tree;
        var current_key;
        var i, count;

        if (keys.length === 0) {
          return tree;
        }

        for (i = 0, count = keys.length - 1; i < count; i++) {
          current_key = keys[i];
          if (subtree[current_key] === undefined) {
            return null;
          }
          subtree = subtree[current_key]; //again goes to the subtree of the desired area 
        }

        current_key = keys[i]; // goes the final tip of the tree holding the value (z for x,y,z)

        return subtree[current_key] !== undefined ? subtree[current_key] : null;
      },

      /**
      * @doc function
      * @name BrainBrowser.tree store:remove
      * @param {multiple} keys Keys that indicate the  path to the node to remove.
      *
      * @returns {any} The value stored at the node (or **null** if it doesn't exist).
      *
      * @description
      * Remove a node from the tree store.
      *
      * ```js
      * var ts = BrainBrowser.createTreeStore();
      * ts.set(x, y, z, "Some text about this point.");
      * ts.get(x, y, z); // => returns "Some text about this point."
      * ts.remove(x, y, z); 
      * ts.get(x, y, z); // => returns **null**
      * ```
      *
      */
      
      remove: function() {
        var keys = Array.prototype.slice.call(arguments);
        var subtree = tree;
        var current_key;
        var i, count;
        var result;


        for (i = 0, count = keys.length - 1; i < count; i++) {
          current_key = keys[i];
          if (subtree[current_key] === undefined) {
            return null;
          }
          subtree = subtree[current_key];
        }

        current_key = keys[i]; //becomes the final key (i is incremented once after loop, becomes keys.length-1)

        result = subtree[current_key];

        subtree[current_key] = undefined;

        return result; //returns the removed value 
      },

      /**
      * @doc function
      * @name BrainBrowser.tree store:reset
      * @param {object} new_tree (Optional) new tree object to set this tree store to.
      *
      * @description
      * Reset the tree to the object given as **new_tree**. If no argument is given, the
      * tree store is cleared.
      *
      * ```js
      * var ts = BrainBrowser.createTreeStore();
      * ts.reset({ x: { y: "z" } });
      * ```
      *
      */
      reset: function(new_tree) {
        new_tree = (new_tree && typeof new_tree === "object") ? new_tree : {};

        tree = new_tree;
      },

      /**
      * @doc function
      * @name BrainBrowser.tree store:forEach
      * @param {number} depth The depth at which to iterate.
      * @param {function} callback Callback function to which
      * the tree nodes will be passed.
      *
      * @description
      * Iterate over tree nodes at a certain depth
      * and pass them to a callback function.
      * ```js
      * var ts = BrainBrowser.createTreeStore();
      * ts.reset({ x: { a: "z" , b: "y"} });
      * ts.forEach(2, function(node) {  // => prints "z" and "y"
      *  console.log(node);
      * }); 
      * ```
      */
      forEach: function(depth, callback) {
        depth = depth > 0 ? depth : 1;
        
        forEach(tree, 1, depth, callback);
      }
    };

  };

  function forEach(subtree, depth, max_depth, callback) {
    if (depth > max_depth) {
      return callback(subtree);
    }

    Object.keys(subtree).forEach(function(key) {
      forEach(subtree[key], depth + 1, max_depth, callback);
    });
  }

})();
