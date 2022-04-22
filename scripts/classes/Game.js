import Fsm from './Fsm.js';
// import { Application } from '../libraries/pixi.js';
console.log('1')
/**
 * transitions: [{ name: 'initialize', from: 'initial', to:'final' }],
 * actions:
 *    [ {
 *      onInitialize: function() {}
 *    } ],
 * 'initialState'
 * @type {[type]}
 */
function Game(options = {}) {
  Fsm.call(
    this,
    options.states,
    options.transitions,
    options.initialState,
   );

  this.version = options.version;

  this.scenes = {};
  this.currentScene = null;

  this.imageCache = options.imageCache || {};
  this.jsonCache = options.jsonCache || {};
  this.cache = {
    images: [],
    jsons: []
  };
  
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  document.body.appendChild(app.view);
  
  //app.ticker.add((delta) => {
  //});
};

Game.augment(Fsm);

Game.prototype.addScene = function(alias, scene) {
  this.scenes[alias] = scene;
}

export default Game;
