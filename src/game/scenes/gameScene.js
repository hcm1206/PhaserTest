import { AUTO, Game, Scene, Input } from 'phaser';

export default class GameScene extends Scene
{
    player;
    platforms;
    cursors;
    jumpCount = 0;

    viewDirLeft = false;
    bulletCount = 0;

    preload()
    {
        this.loadAsset();
        this.load.image('player', 'src/game/assets/debug_character1.png');
        // this.load.image('bullet', '../assets/debug_bullet1.png');
    }

    loadAsset() {}

    create()
    {
        // 발판 물리 오브젝트 설정
        this.platforms = this.physics.add.staticGroup();
        this.bullets = this.physics.add.staticGroup();

        // 세계 경계 충돌 판정 설정
        //this.player.setCollideWorldBounds(true);

        // 키보드 조작 객체 생성
        this.cursors = this.input.keyboard.createCursorKeys();
        this.JumpKeyObject = this.input.keyboard.addKey("Z");
        this.ShootKeyObject = this.input.keyboard.addKey("X");

        this.createMap();

        this.createPlayer();

        // 플레이어와 발판 충돌 판정 추가
        this.physics.add.collider(this.player, this.platforms);
        // 플레이어 최고 속도 설정(낙하 가속도가 무한으로 적용되지 않기 위함)
        this.player.body.setMaxVelocity(500);

        // 총 쏘기 공사 중
        // this.physics.add.overlap(this.platforms, this.bullets, this.hitplatform, null, this);

    }

    createPlayer() {}

    createMap() {}

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