(function() {
  "use strict";
  
  // REQUIRED
  BrainBrowser.config.set("worker_dir", "js/brainbrowser/workers/");

  // Custom configuration for the Surface Viewer demo app.
  BrainBrowser.config.set("model_types.freesurferasc.format_hint", 'You can use <a href="http://surfer.nmr.mgh.harvard.edu/fswiki/mris_convert" target="_blank">mris_convert</a> to convert your binary surface files into .asc format.');
  BrainBrowser.config.set("intensity_data_types.freesurferasc.format_hint", 'You can use <a href="http://surfer.nmr.mgh.harvard.edu/fswiki/mris_convert" target="_blank">mris_convert</a> to convert your binary surface files into .asc format.');

  BrainBrowser.config.set("color_maps", [
    {
      name: "Spectral",
      url: "color-maps/spectral.txt",
    },
    {
      name: "Thermal",
      url: "color-maps/thermal.txt",
    },
    {
      name: "Gray",
      url: "color-maps/gray-scale.txt",
    },
    {
      name: "Blue",
      url: "color-maps/blue.txt",
    },
    {
      name: "Green",
      url: "color-maps/green.txt",
    }
  ]);

})();


