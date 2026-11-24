import BasePlatform from "./BasePlatform";

export default class DirtPlatform extends BasePlatform {
    constructor(scene, x, y, hitbox) {
        super(scene, x, y, 'dirt_platform', hitbox);
    }
}