import GameScene from './gameScene';
import GrassPlatform from '../objects/Platform/GrassPlatform'
import DirtPlatform from '../objects/Platform/DirtPlatform';

export default class Map1Scene extends GameScene
{
    constructor() {
        super('TestScene');
    }

    loadAsset()
    {
        // 이미지 로드
        this.load.image('ground', 'src/game/assets/debug_ground1.png');
        this.load.image('grass_platform', 'src/game/assets/grass_platform.png');
        this.load.image('dirt_platform', 'src/game/assets/dirt_platform.png');
    }

    

    createPlayer()
    {
        // 플레이어 캐릭터 생성
        this.player = this.physics.add.sprite(100, 450, 'player');
    }

    createMap()
    {
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
    }
}