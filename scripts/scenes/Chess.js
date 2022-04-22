import Scene from './Scene.js';
import Canvas from './Canvas.js';

const scene = new Scene('Chess', {
    root: document.querySelector('body'),
    width: 640,
    height: 480,
});

const scene.addViewport({
    name: 'main',
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
});

export default chess;

