// 하나의 맵 구역을 구성하는 게임 Scene 부모 클래스

import { AUTO, Game, Scene, Input } from 'phaser';

export default class GameScene extends Scene
{
    player;
    platforms;
    jumpCount = 0;
    bulletCount = 0;

    constructor(key) {
        super(key);
    }

    // 이전 Scene에서 플레이어 정보 data 객체를 가져옴
    init(data) {
        // data 자체가 없으면(게임 첫 시작 시 등) data 객체 생성 후 기본 정보를 초기화
        if (data == undefined) {
            data = {
                spawnX: 100,
                spawnY: 450,
                dir: false,
                initVY: 0,
                jumpCount: 0,
                incomingDirection: 0,
            }
        }
        // data 객체값에 따라 현재 플레이어의 상태를 초기화함
        // (각 객체의 상태값이 정의되어 있지 않다면 여기서 상태값에 기본정보를 초기화)
        this.spawnX = data.spawnX !== undefined ? data.spawnX : 100;
        this.spawnY = data.spawnY !== undefined ? data.spawnY : 450;
        this.viewDirLeft = data.dir !== undefined ? data.dir : false;
        this.initVY = data.initVY ?? 0;
        this.jumpCount = data.jumpCount ?? 0;
        this.incomingDirection = data.incomingDirection !== undefined ? data.incomingDirection : 0;

        // 상하좌우에 이어진 맵 정보 (구현 Scene에서 직접 구현해야 됨)
        this.neighborScenes = {
            up: null,
            down: null,
            left: null,
            right: null
        };
        this.setupNeighbors();
    }

    preload()
    {
        // 에셋 로드
        this.loadAsset();
        this.load.image('player', 'src/game/assets/debug_character1.png');
        // this.load.image('bullet', '../assets/debug_bullet1.png');
    }

    loadAsset() {}

    // 자식 클래스에서 오버라이드하여 연결될 씬 지정
    setupNeighbors() {
        // 예: this.neighborScenes.right = 'SceneB';
    }

    create()
    {
        // 발판 물리 오브젝트 설정
        this.platforms = this.physics.add.staticGroup();
        this.bullets = this.physics.add.staticGroup();

        // 키보드 조작 객체 생성
        this.keyLeft = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.LEFT);
        this.keyRight = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.RIGHT);
        this.keyZ = this.input.keyboard.addKey("Z", true, true);
        this.keyX = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.X);

        this.createMap();

        this.createPlayer();

        if (this.incomingDirection === 1) {
            this.player.setVelocityX(160);
        } 
        else if (this.incomingDirection === -1) {
            this.player.setVelocityX(-160);
        }

        this.input.keyboard.on('keyup-RIGHT', () => {
            if (this.incomingDirection === 1) {
                this.incomingDirection = 0;
            }
        });

        this.input.keyboard.on('keyup-LEFT', () => {
            if (this.incomingDirection === -1) {
                this.incomingDirection = 0;
            }
        });

        // 세계 경계 충돌 판정 설정
        this.player.setCollideWorldBounds(false);

        // 플레이어와 발판 충돌 판정 추가
        this.physics.add.collider(this.player, this.platforms);
        // 플레이어 최고 속도 설정(낙하 가속도가 무한으로 적용되지 않기 위함)
        this.player.body.setMaxVelocity(500);

        // 맵 진입 시 캐릭터가 움직이고 있었다면 그 속도를 유지
        this.player.setVelocityY(this.initVY);  

        // 총 쏘기 공사 중
        // this.physics.add.overlap(this.platforms, this.bullets, this.hitplatform, null, this);

    }

    createPlayer() {}

    createMap() {}

    checkMapBounds() {
        const { x, y } = this.player;

        let incomingDir = 0;
        if (this.keyLeft.isDown)
        {
            incomingDir = -1;
        }
        else if (this.keyRight.isDown)
        {
            incomingDir = 1;
        }

        // 1. 오른쪽으로 탈출 (x > 800)
        if (x > 800) {
            if (this.neighborScenes.right) {

                this.switchScene(this.neighborScenes.right, { 
                    spawnX: 10, 
                    spawnY: y, 
                    dir: this.viewDirLeft,  
                    incomingDirection: incomingDir,
                    initVY: this.player.body.velocity.y,
                    jumpCount: this.jumpCount,
                });
            }
            else this.player.x = 800;
        }
        // 2. 왼쪽으로 탈출 (x < 0)
        else if (x < 0) {
            if (this.neighborScenes.left) {
                this.switchScene(this.neighborScenes.left, { 
                    spawnX: 790, 
                    spawnY: y,
                    dir: this.viewDirLeft,  
                    incomingDirection: incomingDir,
                    initVY: this.player.body.velocity.y,
                    jumpCount: this.jumpCount,
                });
            }
            else this.player.x = 0;
        }
        // 3. 위쪽으로 탈출 (y < 0)
        else if (y < 0) {
            if (this.neighborScenes.up) {
                this.switchScene(this.neighborScenes.up, { 
                    spawnX: x, 
                    spawnY: 590,
                    dir: this.viewDirLeft,  
                    incomingDirection: incomingDir,
                    initVY: this.player.body.velocity.y,
                    jumpCount: this.jumpCount,
                });
            }
            else this.player.y = 0;
        }
        // 4. 아래쪽으로 탈출 (y > 600)
        else if (y > 600) {
            if (this.neighborScenes.down) {
                this.switchScene(this.neighborScenes.down, { 
                    spawnX: x, 
                    spawnY: 10,
                    dir: this.viewDirLeft,  
                    incomingDirection: incomingDir,
                    initVY: this.player.body.velocity.y,
                    jumpCount: this.jumpCount,
                });
            }
            else this.player.y = 600;
        }
    }

    switchScene(nextSceneKey, spawnData) {
        this.isTransitioning = true;
        this.scene.start(nextSceneKey, spawnData);
    }

    handleControl()
    {
        const isLeftDown = this.keyLeft.isDown;
        const isRightDown = this.keyRight.isDown;
        let isMovingX = false;

        if (isLeftDown)
        {
            this.player.setVelocityX(-160);
            this.viewDirLeft = true;
            isMovingX = true;
            this.incomingDirection = 0;
        }
        else if (isRightDown)
        {
            this.player.setVelocityX(160);
            this.viewDirLeft = false;
            isMovingX = true;
            this.incomingDirection = 0;
        }
        else if (this.incomingDirection === 1) {
            this.player.setVelocityX(160);
            isMovingX = true;
        } 
        else if (this.incomingDirection === -1) {
            this.player.setVelocityX(-160);
            isMovingX = true;
        }
        if (!isMovingX) {
            this.player.setVelocityX(0);
        }
        if (Input.Keyboard.JustDown(this.keyZ) && this.jumpCount < 1)
        {
            this.player.setVelocityY(-500);
            this.jumpCount++;
        }

        // 4방향 경계 체크
        this.checkMapBounds();

        if (this.player.body.touching.down)
        {
            this.jumpCount = 0;
        }
    }

    update()
    {
        this.handleControl();

        // 총 쏘기 공사 중
        /*
        if (this.bullets.body.x < -10 || this.bullets.body.x > 810 || this.bullets.body.y < -10 || this.bullets.body.y > 610) {
            this.bullets.disa
        }
        */
    }
}