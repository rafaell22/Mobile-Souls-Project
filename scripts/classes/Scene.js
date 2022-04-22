// canvas
// layers
// components

function Scene(name, options = {}) {
  this.name = name;
  
  this.canvas = new Canvas(options);
  this.viewports = [];
  
  this.layers = [];
  this.gameObjects = [];
};

Scene.prototype.addLayer = function({ name }) {
  this.layers.push({ name, objects: [] });
}

Scene.prototype.addLayers = function(layers) {
  layers.forEach(layer => {
    this.addLayer(layer);
  });
}

Scene.prototype.addViewport = function({ 
    name,
    x,
    y,
    width,
    height,
    dx,
    dy,
}) {
  this.viewports.push({ name, objects: [] });
}

Scene.augment(GameObject);

export default Scene;