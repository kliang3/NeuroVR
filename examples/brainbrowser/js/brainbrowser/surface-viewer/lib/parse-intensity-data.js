/**
* @doc function
* @name SurfaceViewer.static methods:parseIntensityData
* @param {string} data The intensity data as a string of text
* @param {string} type The format of the intensity data string. Should patch
*   one of the **intensity_data_types** in **BrainBrowser.config**
* @param {function} callback Callback to which the new intensity data object
* will be passed when parsing is complete.
*
* @description
* Parse vertex intensity data from a string of text.
* ```js
* BrainBrowser.SurfaceViewer.parseIntensityData(data, "mniobj", function(intensity_data) {
*   // Manipulate intensity data object.
* });
* ```
*/
BrainBrowser.SurfaceViewer.parseIntensityData = function(data, type, callback) {
  "use strict";

  var worker_url_type = type + "_intensity";
  var error_message;

  if (!BrainBrowser.SurfaceViewer.worker_urls[worker_url_type]) {
    error_message = "error in SurfaceViewer configuration.\n" +
      "Intensity data worker URL for " + type + " not defined.\n" +
      "Use 'BrainBrowser.config.set(\"intensity_data_types." + type + ".worker\", ...)' to set it.";
    
    BrainBrowser.events.triggerEvent("error", { message: error_message });
    throw new Error(error_message);
  }

  var worker = new Worker(BrainBrowser.SurfaceViewer.worker_urls[worker_url_type]);
  
  worker.addEventListener("message", function(e) {
    callback(e.data);
    worker.terminate();
  });

  worker.postMessage({ cmd: "parse", data: data });
};
