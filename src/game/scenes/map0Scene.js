import GameScene from './gameScene';
import GrassPlatform from '../objects/Platform/GrassPlatform';
import DirtPlatform from '../objects/Platform/DirtPlatform';

export default class Map0Scene extends GameScene
{
    constructor() {
        super('Map0Scene');
    }

    init(data) {
        super.init(data);
        this.setupNeighbors();
    }

    loadAsset() {
        // 이미지 로드
        this.load.image('ground', 'src/game/assets/debug_ground1.png');
        this.load.image('grass_platform', 'src/game/assets/grass_platform.png');
        this.load.image('dirt_platform', 'src/game/assets/dirt_platform.png');
    }

    createPlayer() {
        // 플레이어 캐릭터 생성
        this.player = this.physics.add.sprite(this.spawnX, this.spawnY, 'player');
    }

    createMap() {
        // 발판 정보 배열화
        const platformData = [
            {x: 25, y: 575, hb: false, type:DirtPlatform},
            {x: 25, y: 525, hb: false, type:DirtPlatform},
            {x: 25, y: 475, hb: false, type:DirtPlatform},
            {x: 75, y: 475, hb: true, type:GrassPlatform},
            {x: 25, y: 425, hb: false, type:DirtPlatform},
            {x: 25, y: 375, hb: false, type:DirtPlatform},
            {x: 25, y: 325, hb: false, type:DirtPlatform},
            {x: 25, y: 275, hb: false, type:DirtPlatform},
            {x: 25, y: 225, hb: false, type:DirtPlatform},
            {x: 25, y: 175, hb: false, type:DirtPlatform},
            {x: 25, y: 125, hb: false, type:DirtPlatform},
            {x: 25, y: 75, hb: false, type:DirtPlatform},
            {x: 25, y: 25, hb: false, type:DirtPlatform},
            {x: 75, y: 575, hb: true, type:GrassPlatform},
            {x: 125, y: 575, hb: true, type:GrassPlatform},
            {x: 175, y: 575, hb: true, type:GrassPlatform},
            {x: 225, y: 575, hb: true, type:DirtPlatform},
            {x: 275, y: 575, hb: true, type:DirtPlatform},
            {x: 325, y: 575, hb: true, type:DirtPlatform},
            {x: 375, y: 575, hb: true, type:DirtPlatform},
            {x: 425, y: 575, hb: true, type:DirtPlatform},
            {x: 475, y: 575, hb: true, type:DirtPlatform},
            {x: 525, y: 575, hb: true, type:DirtPlatform},
            {x: 575, y: 575, hb: true, type:DirtPlatform},
            {x: 625, y: 575, hb: true, type:GrassPlatform},
            {x: 675, y: 575, hb: true, type:GrassPlatform},
            {x: 725, y: 575, hb: true, type:GrassPlatform},
            {x: 725, y: 625, hb: true, type:GrassPlatform},
            {x: 800, y: 525, hb: true, type:GrassPlatform},
            {x: 225, y: 525, hb: true, type:GrassPlatform},
            {x: 275, y: 525, hb: true, type:GrassPlatform},
            {x: 325, y: 525, hb: true, type:GrassPlatform},
            {x: 375, y: 525, hb: true, type:GrassPlatform},
            {x: 425, y: 525, hb: true, type:GrassPlatform},
            {x: 475, y: 525, hb: true, type:GrassPlatform},
            {x: 525, y: 525, hb: true, type:GrassPlatform},
            {x: 575, y: 525, hb: true, type:GrassPlatform},
        ];

        const hbPlatformData = [
            {x: 25, y: 300, w: 50, h: 600},
        ];

        // 발판을 실제 배치
        platformData.forEach(data => {
            const platform = new data.type(this, data.x, data.y, data.hb);
            this.platforms.add(platform);
        });

        // 투명 발판 배치
        hbPlatformData.forEach(data => {
            const hbPlatform = this.add.zone(data.x, data.y, data.w, data.h);
            this.physics.add.existing(hbPlatform, true);
            this.platforms.add(hbPlatform);
        });
    }

    setupNeighbors() {
        this.neighborScenes.right = 'Map1Scene';
        this.neighborScenes.up = 'Map5Scene';
        this.neighborScenes.down = 'Map6Scene';
    }
    
}