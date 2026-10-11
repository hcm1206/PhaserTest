import { AUTO, Game, Input } from 'phaser';

var config = {
    type: AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#404040',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1800 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


var player;
var platforms;
var cursors;
var jumpCount = 0;

var game = new Game(config);

function preload ()
{
    this.load.image('ground', 'src/game/assets/debug_ground1.png');
    this.load.image('player', 'src/game/assets/debug_character1.png');
}

function create()
{
    platforms = this.physics.add.staticGroup();

    platforms.create(100, 575, 'ground');
    platforms.create(300, 575, 'ground');
    platforms.create(500, 575, 'ground');
    platforms.create(700, 575, 'ground');

    player = this.physics.add.sprite(100, 450, 'player');
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, platforms);
    player.body.setMaxVelocity(500);
}

function update()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
    }
    else
    {
        player.setVelocityX(0);
    }
    if (player.body.touching.down)
    {
        jumpCount = 0;
    }
    if (Input.Keyboard.JustDown(cursors.up) && jumpCount < 2)
    {
        player.setVelocityY(-500);
        jumpCount++;
    }
}