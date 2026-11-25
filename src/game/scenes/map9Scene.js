import GameScene from './gameScene';
import DirtPlatform from '../objects/Platform/DirtPlatform';
import GrassPlatform from '../objects/Platform/GrassPlatform'

export default class Map9Scene extends GameScene
{
    constructor() {
        super('Map9Scene');
    }

    init(data) {
        super.init(data);
        this.setupNeighbors();
    }

    loadAsset() {
        // 이미지 로드
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
            {x: 25, y: 575, type:GrassPlatform},
            {x: 75, y: 575, hb: false, type:DirtPlatform},
            {x: 75, y: 525, hb: false, type:DirtPlatform},
            {x: 75, y: 475, hb: false, type:DirtPlatform},
            {x: 75, y: 425, hb: false, type:DirtPlatform},
            {x: 75, y: 375, hb: false, type:DirtPlatform},
            {x: 75, y: 325, hb: false, type:DirtPlatform},            
            {x: 75, y: 275, hb: false, type:DirtPlatform},
            {x: 75, y: 225, hb: false, type:DirtPlatform},
            {x: 75, y: 175, hb: false, type:DirtPlatform},
            {x: 75, y: 125, hb: false, type:DirtPlatform},            
            {x: 75, y: 75, hb: false, type:DirtPlatform},
            {x: 75, y: 25, hb: false, type:DirtPlatform},
            {x: 75, y: -25, hb: false, type:DirtPlatform},
        ]

        const hbPlatformData = [
            {x: 75, y: 300, w: 50, h: 700},
        ]

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
        this.neighborScenes.up = 'Map7Scene'
        this.neighborScenes.left = 'Map8Scene'
    }
    
}