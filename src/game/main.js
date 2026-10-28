import { AUTO, Game } from 'phaser';
import Map1Scene from './scenes/map1Scene';

const config = {
    type: AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#5bc6ff',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1800 },
            debug: true
        }
    },
    scene: Map1Scene
};

const game = new Game(config);