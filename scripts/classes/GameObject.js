function GameObject() {};
GameObject.prototype.initialize = function() {};
GameObject.prototype.update = function() {}
GameObject.prototype.draw = function() {}
GameObject.prototype.destroy = function() {}

GameObject.prototype.setInitialize = function(initializeFunction) {
    this.initialize = initializeFunction;
    return this;
}

GameObject.prototype.setUpdate = function(updateFunction) {
    this.update = updateFunction;
    return this;
}

GameObject.prototype.setDraw = function(drawFunction) {
    this.initialize = initializeFunction;
    return this;
}

GameObject.prototype.setDestroy = function(destroyFunction) {
    this.initialize = initializeFunction;
    return this;
}