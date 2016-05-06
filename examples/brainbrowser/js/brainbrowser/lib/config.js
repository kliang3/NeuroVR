(function() {
  "use strict";

  var config = BrainBrowser.createTreeStore();

  BrainBrowser.config = {

    /**
    * @doc function
    * @name BrainBrowser.config:set
    * @param {string} config_string Namespaced configuration property.
    * @param {any} value The value of the configuration property.
    *
    * @description
    * Set a configuration parameter.
    *
    * ```js
    * BrainBrowser.config.set("color_map_path", "color-maps/spectral.txt");
    * ```
    *
    * Configuration parameters can be namespaced, so for example:
    *
    * ```js
    * BrainBrowser.set("color_maps.spectral.name", "Spectral")
    * ```
    *
    * Will set the **name** property in the **spectral** namespace of the
    * **color_maps** namespace.
    *
    *-->Color_maps
    *------> name 
    *----------->spectral
    */
    set: function(config_string, value) {
      config_string = config_string || "";
      var config_params = config_string.split(".");

      config_params.push(value);
     
      config.set.apply(config, config_params); // input is the config object, config_params are the arguments an array, where 
      //the last element is the value to be added (leaf at the end of the tree)
    },

    /**
    * @doc function
    * @name BrainBrowser.config:get
    * @param {string} config_string Namespaced configuration property.
    *
    * @returns {any} The value of the configuration parameter (or **null** if it doesn't exist).
    *
    * @description
    * Retrieve a configuration parameter.
    *
    * ```js
    * var color_map_path = BrainBrowser.config.get("color_map_path");
    * ```
    *
    * If the requested parameter does not exist, **null** will be returned.
    *
    * Namespaces are implemented as objects, so if a namespace is requested
    * with **get** the namespace object will be returned. For example, if a property
    * were set as follows:
    *
    * ```js
    * BrainBrowser.set("color_maps.spectral.name", "Spectral")
    * ```
    *
    * then the following **get** call:
    *
    * ```js
    * BrainBrowser.set("color_map.spectral")
    * ```
    *
    * would return the object:
    *
    * ```js
    *  { name: "Spectral" }
    * ```
    *
    */
    get: function(config_string) {
      config_string = config_string || "";
      var config_params = config_string.split(".");

      return config.get.apply(config, config_params); //returns the value from the CreateTreeStore.getAttention
      //config is the name of the function createTreeStore().set
    }
  };

})();
