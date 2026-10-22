import BasePlatform from "./BasePlatform";

export default class GrassPlatform extends BasePlatform {
    constructor(scene, x, y) {
        super(scene, x, y, 'grass_platform');
    }
}