import GameScene from './gameScene';
import GrassPlatform from '../objects/Platform/GrassPlatform'
import DirtPlatform from '../objects/Platform/DirtPlatform';
import DebugTrap from '../objects/Trap/DebugTrap';

export default class Map1Scene extends GameScene
{
    constructor() {
        super('Map1Scene');
    }

    init(data) {
        super.init(data);
        this.setupNeighbors();
    }

    loadAsset() {
        // 이미지 로드
        this.load.image('grass_platform', 'src/game/assets/grass_platform.png');
        this.load.image('dirt_platform', 'src/game/assets/dirt_platform.png');
        this.load.image('debug_trap', 'src/game/assets/debug_trap.png')
    }

    createPlayer() {
        // 플레이어 캐릭터 생성
        this.player = this.physics.add.sprite(this.spawnX, this.spawnY, 'player');
    }

    createMap() {
        // 발판 정보 배열화
        const platformData = [
            {x: 0, y: 525, type:GrassPlatform},
            {x: 75, y: 575, type:GrassPlatform},
            {x: 75, y: 625, type:GrassPlatform},
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
            {x: 825, y: 575, type:GrassPlatform},
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
            {x: 725, y: 75, type:GrassPlatform},
        ]

        const trapData = [
            {x: 300, y: 480, type:DebugTrap},
            {x: 400, y: 480, type:DebugTrap},
            {x: 400, y: 440, type:DebugTrap},
            {x: 500, y: 480, type:DebugTrap},
        ]

        // 발판을 실제 배치
        platformData.forEach(data => {
            const platform = new data.type(this, data.x, data.y, data.hb);
            this.platforms.add(platform);
        });

        trapData.forEach(data => {
            const trap = new data.type(this, data.x, data.y);
            this.traps.add(trap);
        });


        const { width, height } = this.scale;
        this.add.text(width / 2, height / 2 - 200, 'Press ←, → To Move Your Character', {
            fontSize: '20px',
            fontFamily: 'Courier',
            color: '#f0f0f0',
            shadow: {
                offsetX: 0,
                offsetY: 0,
                color: '#000000',
                blur: 0,
                stroke: false,
                fill: false
            },
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2 - 150, 'Press Z To Jump', {
            fontSize: '20px',
            fontFamily: 'Courier',
            color: '#f0f0f0',
            shadow: {
                offsetX: 0,
                offsetY: 0,
                color: '#000000',
                blur: 0,
                stroke: false,
                fill: false
            },
        }).setOrigin(0.5);

    }

    setupNeighbors() {
        this.neighborScenes.left = 'Map0Scene';
        this.neighborScenes.right = 'Map2Scene';
        this.neighborScenes.up = 'Map4Scene';
        this.neighborScenes.down = 'Map7Scene';
    }
    
}