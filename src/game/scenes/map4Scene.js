import GameScene from './gameScene';
import GrassPlatform from '../objects/Platform/GrassPlatform'
import DirtPlatform from '../objects/Platform/DirtPlatform';

export default class Map4Scene extends GameScene
{
    constructor() {
        super('Map4Scene');
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
            {x: 725, y: 550, type:GrassPlatform},
            {x: 625, y: 550, type:GrassPlatform},
            {x: 525, y: 550, type:GrassPlatform},
            {x: 425, y: 550, type:GrassPlatform},
            {x: 375, y: 525, type:GrassPlatform},
            {x: 325, y: 525, type:GrassPlatform},
            {x: 275, y: 425, type:GrassPlatform},
        ]

        // 발판을 실제 배치
        platformData.forEach(data => {
            const platform = new data.type(this, data.x, data.y);
            this.platforms.add(platform);
        });
    }

    setupNeighbors() {
        this.neighborScenes.left = 'Map5Scene'
        this.neighborScenes.right = 'Map3Scene'
        this.neighborScenes.down = 'Map1Scene'
    }

}