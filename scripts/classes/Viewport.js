function Viewport(options = {}) {
  this.canvas = document.createElement('CANVAS');
  this.canvas.style.position = 'absolute';
  this.canvas.style.top = options && options.y ? options.y : 0;
  this.canvas.style.left = options && options.x ? options.x : 0;
  this.canvas.width = options && options.width ? options.width : window.innerWidth;
  this.canvas.height = options && options.height ? options.height : window.innerHeight;
  
  this.context = this.canvas.getContext('2d');
  
  this.viewport = { x: 0, y: 0 };
  
  this.ZOOM_FACTOR = 0.5;
  this.zoom = options && options.zoom ? options.zoom : 1;

  this.addEventListeners();
}

Viewport.prototype.zoomIn = function(){
   if(this.ZOOM_FACTOR >= this.zoom) return;
   this.zoom -= this.ZOOM_FACTOR;
}

Viewport.prototype.zoomOut = function(){
   this.zoom += this.ZOOM_FACTOR;
}

Viewport.prototype.update = function() {};

Viewport.prototype.draw = function() {};


export default Viewport;