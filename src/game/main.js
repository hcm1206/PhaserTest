import { Scene, AUTO, Game, Input } from 'phaser';

class TestScene extends Scene
{
    player;
    platforms;
    cursors;
    jumpCount = 0;

    preload()
    {
        this.load.image('ground', 'src/game/assets/debug_ground1.png');
        this.load.image('player', 'src/game/assets/debug_character1.png');
    }

    create()
    {
        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(100, 575, 'ground');
        this.platforms.create(300, 575, 'ground');
        this.platforms.create(500, 575, 'ground');
        this.platforms.create(700, 575, 'ground');

        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, this.platforms);
        this.player.body.setMaxVelocity(500);
    }

    update()
    {
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);
        }
        else
        {
            this.player.setVelocityX(0);
        }
        if (this.player.body.touching.down)
        {
            this.jumpCount = 0;
        }
        if (Input.Keyboard.JustDown(this.cursors.up) && this.jumpCount < 2)
        {
            this.player.setVelocityY(-500);
            this.jumpCount++;
        }
    }

}

const config = {
    type: AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#404040',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1800 },
            debug: true
        }
    },
    scene: TestScene
};

const game = new Game(config);