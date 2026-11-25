import GameScene from './gameScene';
import GrassPlatform from '../objects/Platform/GrassPlatform'
import DirtPlatform from '../objects/Platform/DirtPlatform';

export default class Map5Scene extends GameScene
{
    constructor() {
        super('Map5Scene');
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

        ];

        // 발판을 실제 배치
        platformData.forEach(data => {
            const platform = new data.type(this, data.x, data.y, data.hb);
            this.platforms.add(platform);
        });
    }

    setupNeighbors() {
        this.neighborScenes.right = 'Map4Scene';
        this.neighborScenes.down = 'Map0Scene';
    }

}