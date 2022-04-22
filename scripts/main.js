// Create the application helper and add its render target to the page
/**
      let app = new PIXI.Application({ width: 640, height: 360 });
      document.body.appendChild(app.view);

      // Create the sprite and add it to the stage
      let sprite = PIXI.Sprite.from('./assets/images/sample.png');
      app.stage.addChild(sprite);

      // Add a ticker callback to move the sprite back and forth
      let elapsed = 0.0;
      app.ticker.add((delta) => {
        elapsed += delta;
        sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
      });
**/

import Game from './classes/Game.js';

const game = new Game({
    states: [
      {name: 'start', from: 'setup', to: 'game'},
      /**
      { name: 'loadGame', from: 'setup', to: 'menu' },
      { name: 'startGame', from: 'menu', to: 'game' },
      { name: 'pauseGame', from: 'game', to: 'paused' },
      { name: 'unpauseGame', from: 'paused', to: 'game' },
      { name: 'endGame', from: 'game', to: 'gameover' },
      { name: 'restartGame', from: ['gameover', 'game'], to: 'menu' }
      **/
    ],
    transitions: {
      onStart: function() {
          // load resources
          
          // create all scenes
          
      },
    },
    initialState: 'setup'
}); 
