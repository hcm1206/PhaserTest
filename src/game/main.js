import { Scene, AUTO, Game, Input } from 'phaser';
import GrassPlatform from './objects/Platform/GrassPlatform';
import DirtPlatform from './objects/Platform/DirtPlatform';

class TestScene extends Scene
{
    player;
    platforms;
    cursors;
    jumpCount = 0;

    viewDirLeft = false;
    bulletCount = 0;

    preload()
    {
        // 이미지 로드
        this.load.image('ground', 'src/game/assets/debug_ground1.png');
        this.load.image('player', 'src/game/assets/debug_character1.png');
        // this.load.image('bullet', 'src/game/assets/debug_bullet1.png');
        this.load.image('grass_platform', 'src/game/assets/grass_platform.png');
        this.load.image('dirt_platform', 'src/game/assets/dirt_platform.png');
    }

    create()
    {
        // 발판 물리 오브젝트 설정
        this.platforms = this.physics.add.staticGroup();
        this.bullets = this.physics.add.staticGroup();

        // 발판 정보 배열화
        const platformData = [
            {x: 25, y: 575, type:GrassPlatform},
            {x: 75, y: 575, type:GrassPlatform},
            {x: 125, y: 575, type:GrassPlatform},
            {x: 175, y: 575, type:GrassPlatform},
            {x: 225, y: 575, type:DirtPlatform},
            {x: 275, y: 575, type:DirtPlatform},
            {x: 325, y: 575, type:DirtPlatform},
            {x: 375, y: 575, type:DirtPlatform},
            {x: 425, y: 575, type:DirtPlatform},
            {x: 475, y: 575, type:DirtPlatform},
            {x: 525, y: 575, type:DirtPlatform},
            {x: 575, y: 575, type:DirtPlatform},
            {x: 625, y: 575, type:GrassPlatform},
            {x: 675, y: 575, type:GrassPlatform},
            {x: 725, y: 575, type:GrassPlatform},
            {x: 775, y: 575, type:GrassPlatform},
            {x: 225, y: 525, type:GrassPlatform},
            {x: 275, y: 525, type:GrassPlatform},
            {x: 325, y: 525, type:GrassPlatform},
            {x: 375, y: 525, type:GrassPlatform},
            {x: 425, y: 525, type:GrassPlatform},
            {x: 475, y: 525, type:GrassPlatform},
            {x: 525, y: 525, type:GrassPlatform},
            {x: 575, y: 525, type:GrassPlatform},

            {x: 725, y: 475, type:GrassPlatform},
            {x: 725, y: 375, type:GrassPlatform},
            {x: 725, y: 275, type:GrassPlatform},
            {x: 725, y: 175, type:GrassPlatform},
        ]

        // 발판을 실제 배치
        platformData.forEach(data => {
            const platform = new data.type(this, data.x, data.y);
            this.platforms.add(platform);
        });

        /*
        this.platforms.create(100, 575, 'ground');
        this.platforms.create(300, 575, 'ground');
        this.platforms.create(500, 575, 'ground');
        this.platforms.create(700, 575, 'ground');
        */

        // 플레이어 캐릭터 생성
        this.player = this.physics.add.sprite(100, 450, 'player');
        // 세계 경계 충돌 판정 설정
        this.player.setCollideWorldBounds(true);

        // 키보드 조작 객체 생성
        this.cursors = this.input.keyboard.createCursorKeys();
        this.JumpKeyObject = this.input.keyboard.addKey("Z");
        this.ShootKeyObject = this.input.keyboard.addKey("X");

        // 플레이어와 발판 충돌 판정 추가
        this.physics.add.collider(this.player, this.platforms);
        // 플레이어 최고 속도 설정(낙하 가속도가 무한으로 적용되지 않기 위함)
        this.player.body.setMaxVelocity(500);

        // 총 쏘기 공사 중
        // this.physics.add.overlap(this.platforms, this.bullets, this.hitplatform, null, this);

    }

    update()
    {
        // 방향키 좌측 이동
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
            this.viewDirLeft = true;
        }
        // 방향키 우측 이동
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);
            this.viewDirLeft = false;
        }
        // 좌우 입력 없으면 관성 없이 바로 좌우 축 이동을 정지
        else
        {
            this.player.setVelocityX(0);
        }
        if (Input.Keyboard.JustDown(this.JumpKeyObject) && this.jumpCount < 1)
        {
            this.player.setVelocityY(-500);
            this.jumpCount++;
        }
        if (Input.Keyboard.JustDown(this.ShootKeyObject)) {

        }

        if (this.player.body.touching.down)
        {
            this.jumpCount = 0;
        }

        // 총 쏘기 공사 중
        /*
        if (this.bullets.body.x < -10 || this.bullets.body.x > 810 || this.bullets.body.y < -10 || this.bullets.body.y > 610) {
            this.bullets.disa
        }
        */
    }

    // 총 쏘기 공사 중
    /*
    shootBullet = (x, y) => {
        const bullet = this.
        bulletCount++;
    }

    hitplatform (bullet, platform) {
        bullet.disableBody(true, true);
        this.bulletCount--;
    }
    */
}

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
    scene: TestScene
};

const game = new Game(config);