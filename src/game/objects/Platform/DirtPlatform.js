import BasePlatform from "./BasePlatform";

export default class DirtPlatform extends BasePlatform {
    constructor(scene, x, y) {
        super(scene, x, y, 'dirt_platform');
    }
}