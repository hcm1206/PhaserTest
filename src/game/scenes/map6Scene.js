import GameScene from './gameScene';
import DirtPlatform from '../objects/Platform/DirtPlatform';

export default class Map6Scene extends GameScene
{
    constructor() {
        super('Map6Scene');
    }

    init(data) {
        super.init(data);
        this.setupNeighbors();
    }

    loadAsset() {
        // 이미지 로드
        this.load.image('dirt_platform', 'src/game/assets/dirt_platform.png');
    }

    createPlayer() {
        // 플레이어 캐릭터 생성
        this.player = this.physics.add.sprite(this.spawnX, this.spawnY, 'player');
    }

    createMap() {
        // 발판 정보 배열화
        const platformData = [
            {x: 725, y: 625, type:DirtPlatform},
            {x: 725, y: 575, type:DirtPlatform},
            {x: 725, y: 525, type:DirtPlatform},
            {x: 725, y: 475, type:DirtPlatform},
            {x: 725, y: 425, type:DirtPlatform},
            {x: 725, y: 375, type:DirtPlatform},
            {x: 725, y: 325, type:DirtPlatform},            
            {x: 725, y: 275, type:DirtPlatform},
            {x: 725, y: 225, type:DirtPlatform},
            {x: 725, y: 175, type:DirtPlatform},
            {x: 725, y: 125, type:DirtPlatform},            
            {x: 725, y: 75, type:DirtPlatform},
            {x: 725, y: 25, type:DirtPlatform},
            {x: 725, y: -25, type:DirtPlatform},
        ]

        // 발판을 실제 배치
        platformData.forEach(data => {
            const platform = new data.type(this, data.x, data.y);
            this.platforms.add(platform);
        });
    }

    setupNeighbors() {
        this.neighborScenes.up = 'Map0Scene'
        this.neighborScenes.down = 'Map8Scene'
        this.neighborScenes.right = 'Map7Scene'
    }
    
}