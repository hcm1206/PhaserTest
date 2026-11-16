import { AUTO, Game, Scale } from 'phaser';
import Map1Scene from './scenes/map1Scene';
import Map2Scene from './scenes/map2Scene';
import Map0Scene from './scenes/map0Scene';
import Map3Scene from './scenes/map3Scene';
import Map4Scene from './scenes/map4Scene';
import Map5Scene from './scenes/map5Scene';
import Map6Scene from './scenes/map6Scene';
import Map7Scene from './scenes/map7Scene';
import Map8Scene from './scenes/map8Scene';
import Map9Scene from './scenes/map9Scene';

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
        scale: {
        mode: Scale.FIT
    },
    scene: [Map1Scene, Map0Scene, Map2Scene, Map3Scene, Map4Scene, Map5Scene, Map6Scene, Map7Scene, Map8Scene, Map9Scene]
};

const game = new Game(config);